export function format(){
  var as=[].slice.call(arguments),fmt=as.shift(),i=0;
  return     fmt.replace(/%(\w)?(\d)?([dfsx])/ig,function(_,a,b,c){
    var s=b?new Array(b-0+1).join(a||''):'';
    if(c=='d') s+=parseInt(as[i++]);
    return b?s.slice(b*-1):s;
  })
}