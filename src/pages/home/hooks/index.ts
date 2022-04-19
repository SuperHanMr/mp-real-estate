/*
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 17:45:38
 * @LastEditTime: 2022-04-19 14:26:47
 * @LastEditors: HanYongHui
 */
import { ref, reactive, toRefs } from "vue";
import { getEstateList, EstateList } from "../../../api/estate-list";

const data = reactive<{ list: EstateList }>({ list: [] })
const loadType = ref<"succeed" | "error" | "load" | "complete">("succeed");
const maxId = ref<number>(0)
export const useEstateListHook = () => {
  const requestEstateList = async (load?: boolean) => {
    try {
      const res = await getEstateList(load ? maxId.value : 0)
      if (load) {
        if (res.data?.length) {
          data.list = data.list.concat(res.data || [])
          loadType.value = "error"
        } else {
          loadType.value = "complete"
        }
      } else {
        data.list = res.data || []
        uni.stopPullDownRefresh();
      }
      // maxId 用于分页加载 默认传0
      maxId.value = data.list[data.list.length - 1].id
    } catch {
      uni.stopPullDownRefresh();
      loadType.value = "error"
    }
  }





  return {
    loadType,
    maxId,
    ...toRefs(data),
    requestEstateList
  }
}