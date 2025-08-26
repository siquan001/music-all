# MusicAll

MusicAll.js是一个用于整合第三方音乐获取API的前端库，用于解决在第三方API稳定性未知、以及多数据多API整合和灵活调用的库。

# 使用方式

musicAll核心文件并未自带任何引擎，你可以通过以下方式添加并设置权重，权重越高，引擎会被越优先调用。

```javascript
musicAll.addEngine(Engine1,2);
musicAll.addEngine(Engine2,1);
```

你可以在获取不同信息时，设置不同的平台信息优先级，设置为优先平台的将会先尝试获取：
```javascript
musicAll.config().getSort.img=['netease','qq'] // 在获取图片时优先尝试netease平台
```

完成配置后即可开始获取：
```javascript
musicAll.get({
    qq:{/*****/},
    netease:{/*****/}, // 根据引擎文档填写
},{
    music:(url)=>{
        // 
    },
    img:(url)=>{
        //
    }
})
```

get时可以设置多个平台信息，引擎将获取这些信息，若不提供某平台的信息，将会跳过该平台。得到的数据会分别调用第二个参数的对应函数（回调的时间并不都是一样的，因为可能调用不同的API）

## 引擎开发

首先明确大致平台书写规范：

- `kugou`
- `qq`
- `netease` // 网易云
- `gequbao` // 歌曲宝
- `youtube`
- `bilibili`
- `apple`
- `xiami`

其次是可获取数据：

- `music` 返回可播放url
- `img` 返回可用图片url
- `details` 返回对象，但不一定包含全部信息 
    - `artist` 歌手
    - `name` 歌曲名称
    - `album` 专辑
- `lrc` 返回lrc格式歌词
- `trc` 返回经翻译后的lrc歌词

除`music` `img`外，其他数据并不强求，可以随便来，但为增强通用性，应保持标准数据返回

然后一个合法引擎的格式如下：

```javascript
let engine={
    name:"engineName", // 名字（建议纯英文+数字）
    platform:'platform', // 平台
    support:['music','img'], // 支持获取的数据
    requestFz:[['music','img']], // 将存在于同一请求中的数据包起来
    get:async function(details){
        // 以如下格式返回
        return {
            music:'url',
            img:'url',
        };
    }
}
```