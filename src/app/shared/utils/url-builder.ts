export class URLBuilder{
    public static build(url:string,params:any[]){
        let regex =/\{[a-zA-Z0-9]*\}/g;
        let founds = url.match(regex);
        let index=0;
        for(let item of founds){
            url = url.replace(item,params[index++]);
        }
        return url;
    }

}