export async function getJson(valuePath: string){
  return await (await fetch(valuePath)).json()
}
export function shareLink(path: string) {
  let goPath = path.replace('xxxxx', window.location.href)
  window.open(goPath)
}
interface QueryParams  {
  id: string;
  type: string;
}
export function getQueryParams(): QueryParams{

  let search = window.location.search.slice(1)
  let a = {}
  search.split("&").map(el => {
    a[el.split('=')[0]] = el.split('=')[1]
  })
  return a as QueryParams
}
export let type = '4'
