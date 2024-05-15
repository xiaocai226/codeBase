<template>
<!-- 做终端窗口 -->
	<el-card>
		<!-- 终端部分 -->
		<div>
			<div ref="xtermContainer"></div>
		</div>
	</el-card>
</template>

<script>
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import 'xterm/lib/xterm.js';
export default {
  data() {
    return {
      terminal: null,
      fitAddon: null,
      websocket: null,
      userInput: '', // 存储用户输入的文本
    };
  },
  mounted() {
    // 初始化终端
    this.initializeTerminal();
    // 初始化WebSocket连接
    this.initializeWebSocket();
  },
  beforeDestroy() {
    // 销毁终端
    this.destroyTerminal();
    // 销毁WebSocket连接
    this.destroyWebSocket();
  },
  methods: {
    // 创建终端对象
    initializeTerminal() {
      this.terminal = new Terminal();
      this.fitAddon = new FitAddon();
      this.terminal.loadAddon(this.fitAddon);
      this.terminal.open(this.$refs.xtermContainer);
      this.fitAddon.fit();
      this.terminal.writeln('欢迎使用Xterm.js终端!');

      // 监听终端键盘事件
      this.terminal.onKey((event) => {
        console.log('terminal', event);
        const key = event.domEvent;
        if (this.websocket) {
          if (key.keyCode === 13) {
            // 如果按下回车键，则发送内容到后端并清空用户输入
            this.websocket.send(this.userInput);
            this.userInput = ''; // 清空用户输入
          } else if (key.keyCode === 8) {
            // 如果按下退格键，则删除最后一个字符
            if (this.userInput.length > 0) {
              this.userInput = this.userInput.slice(0, -1);
              // 删除终端上显示的最后一个字符
              this.terminal.write('\b \b');
            }
          } else if (key.ctrlKey && key.keyCode === 67) {
            // 如果按下 Ctrl + C，则复制选定的文本
            this.terminal.copySelection();
          } else if (key.ctrlKey && key.keyCode === 86) {
            // 如果按下 Ctrl + V，则粘贴剪贴板的内容
            navigator.clipboard.readText().then((text) => {
                this.terminal.write(text);
            });
          } else {
            // 将用户输入的字符添加到userInput中并显示在终端上
            this.userInput += event.key;
            this.terminal.write(event.key);
          }
        }
      });
    },
    initializeWebSocket() {
      // 创建WebSocket连接
      this.websocket = new WebSocket('ws://192.168.100.140:4000/api/v1/connect/mybox');
      // WebSocket连接事件处理
      this.websocket.onopen = () => {
        console.log('WebSocket连接已打开');
      };

      this.websocket.onmessage = (event) => {
        // 处理从服务器接收到的WebSocket消息，将其写入终端
        console.log('this.websocket',event)
        const message = event.data;
        console.log('websocket', message)
        this.terminal.write(message);
      };

      this.websocket.onclose = () => {
        console.log('WebSocket连接已关闭');
      };

      this.websocket.onerror = (error) => {
        console.error('WebSocket连接发生错误:', error);
      };
    },
    destroyTerminal() {
      // 销毁终端对象
      if (this.terminal) {
        this.terminal.dispose();
      }
    },
    destroyWebSocket() {
      // 关闭WebSocket连接
      if (this.websocket) {
        this.websocket.close();
      }
    },
  },
}
</script>

<style>
</style>
