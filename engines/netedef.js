(()=>{
    window.neteDefEngine={
        name:'netedef',
        platform:'netease',
        support:['music'],
        requestFz:[['music']],
        get:async function(details){
            if(!details.id){
                throw musicAll.ctErr(0,details,'id');
            }
            return 
            {music:'https://music.163.com/song/media/outer/url?id='+details.id+'.mp3'}
        }
    }
})();