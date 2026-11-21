# Apache Guacamole 图形会话录制（#645）

Apache Guacamole 1.6.0 手册确认，连接参数 `recording-path` 启用服务端图形录制；未配置则不录制，`guacd` 需有录制目录写权限。

录制文件已生成也不保证历史记录可回放。浏览器回放需要录制存储扩展，并且 Web 应用能读取目录和录制文件。扩展在配置的搜索路径下查找：录制文件直接位于此路径且文件名等于历史记录 UUID；或录制文件放在以该 UUID 命名的一级子目录中。未推断音频、保留期或默认键盘记录。未启动 Guacamole 或录制会话。

- https://guacamole.apache.org/doc/gug/configuring-guacamole.html#graphical-session-recording
- https://guacamole.apache.org/doc/gug/recording-playback.html#how-recording-storage-and-playback-works
- https://guacamole.apache.org/doc/gug/recording-playback.html#preparing-a-directory-for-recording-storage
