# NAPS2 PDF 加密资料核实

2026-11-16，只读官方文档，无软件运行、扫描或文件处理。

https://www.naps2.com/doc/command-line 的 PDF Options 说明 --encryptconfig 为生成的 PDF 指定加密配置，示例包含 EncryptPdf、UserPassword、OwnerPassword；--usesavedencryptconfig 使用 GUI 已保存的加密设置。因此比较表 encrypt 从 unknown 改为 yes。

限定生成 PDF 的密码加密，不把打印、复制等权限标志视为无法绕过的保护，不推断算法、强度、合规认证或任意已有 PDF 无损重写。文档示例密码仅为说明，未复制为使用建议或创建密码文件；实际配置文件可能包含明文密码，应按秘密资料保护。

不改变 annotate/compress 的未知状态；不从 TIFF/JPEG 压缩参数推断通用 PDF 压缩。保留采集基线及其它字段，未重新核验全部产品信息。没有绕过密码、上传用户文件或发送邮件。
