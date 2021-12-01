# Electric_Vehicle
*Xingxun Jiang, Kexin Li, Hui Gao, "Electric Vehicle's Intelligent Charging Guidance and Charging Station Optimal Configuration Design in Foshan city (佛山市电动汽车智能充电引导及充电站优化配置方案展示系统)", 2019*

*Xingxun Jiang: jiangxingxun@seu.edu.cn; jiangxingxun@gmail.com*

## Requirements
- python >= 3.5.2 
- nodejs
- yarn
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

choco install yarn
```

## Usage
- Step1: run 
```yarn```
```yarn dev ```
- Step2: browser 
```http://localhost:3000/ ```


## Files and Folders
- constants：常量类
- pages：页面文件。以下划线开头的为全局页面配置文件，非下划线开头的为实体页面文件。页面的名称为路由的名称，index 为首页。本项目有三个页面：
  - index：首页 
  - overview：总览页面 
  - map：地图页 
- src：各个页面中用到的组件 
- static：图片等静态文件
- utils：工具类
- package.json：整个项目的配置。 `package.json` 文件的 scripts 标签下列出了运行项目的命令行。一般使用 `yarn dev` 即可运行项目。

## Login
account: root; password: 1234
