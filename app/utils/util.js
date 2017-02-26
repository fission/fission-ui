/**
 * Created by damien on 24/02/2017.
 */

export function slug(str) {
  // remove accents, swap ñ for n, etc
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeeiiiiooooouuuunc------';

  let strClean = str.replace(/^\s+|\s+$/g, ''); // trim
  strClean = strClean.toLowerCase();

  for (let i = 0, l = from.length; i < l; i += 1) {
    strClean = strClean.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  strClean = strClean.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return strClean;
}

export function decodeBase64(s) {
  let e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
  let A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for(i=0;i<64;i++){e[A.charAt(i)]=i;}
  for(x=0;x<L;x++){
    c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
    while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
  }
  return r;
}
