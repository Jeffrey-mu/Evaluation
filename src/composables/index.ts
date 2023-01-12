export async function getJson(valuePath: string) {
  return await (await fetch(valuePath)).json()
}
export interface dataModel {
  title: string;
  release_time: string;
  first_picture: string;
  id: string;
  type: string | number;
  main_title: string;
  author_name: string;
  score: string;
  time_en: string;
  description: string;
}

export function shareLink(path: string) {
  let goPath = path.replace('xxxxx', window.location.href)
  window.open(goPath)
}
interface QueryParams {
  id: string;
  type: string;
}
export function getQueryParams(): QueryParams {

  let search = window.location.search.slice(1)
  let a = {}
  search.split("&").map(el => {
    a[el.split('=')[0]] = el.split('=')[1]
  })
  return a as QueryParams
}
export let type = '4'
export let searchResult = ref<dataModel[]>([])
export function searchResultHooks() {
  let searchData: dataModel[] = []
  getJson('/api/search/search.json').then(res => {
    searchData = res
  })
  function searchResultFilter(value: string) {
    if(value)
      searchResult.value = searchData.filter(el => el.main_title.includes(value) || el.title.includes(value)) as []
    else
      searchResult.value = []
  }
  return {
    searchResultFilter,
    searchResult
  }
}

let MobileMenuWidth = ref<string>('0vw')

export function menu_hooks() {

  function setMobileMenuWidth(width: string) {
    MobileMenuWidth.value = width
  }
  return {
    MobileMenuWidth,
    setMobileMenuWidth
  }
}

export function handleNextPage(path: string) {
  go(path)
}
