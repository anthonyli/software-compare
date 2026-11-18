import {rm} from 'node:fs/promises';

// Observe immediately after spawn: exitCode alone does not mean stdio closed.
export function observeBrowserClose(child) {
 let closed = false;
 const completion = new Promise(resolve => child.once('close', () => { closed = true; resolve(); }));
 const wait = milliseconds => new Promise(resolve => {
  const timer = setTimeout(() => resolve(false), milliseconds);
  completion.then(() => { clearTimeout(timer); resolve(true); });
 });
 return async function stop({graceMs = 5000, killMs = 5000} = {}) {
  if (closed) return;
  if (child.exitCode === null && child.signalCode === null) child.kill('SIGTERM');
  if (await wait(graceMs)) return;
  if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
  if (!(await wait(killMs))) throw new Error('Native browser did not close; profile retained for diagnosis');
 };
}

export async function cleanupBrowserProfile(stop, profile, remove = rm) {
 await stop();
 // A Chromium descendant may finish a last profile write during shutdown.
 // Retry only filesystem cleanup, never the test or its assertions.
 await remove(profile, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
}
