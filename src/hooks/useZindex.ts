import { ref, computed } from "vue";

const zIndex = ref(0);

const useZindex = (initialValue = 2000) => {
  const initialZIndex = ref(initialValue);
  const currentZindex = computed(() => zIndex.value + initialZIndex.value);
  const nextZindex = () => {
    zIndex.value++;
    return currentZindex.value;
  };
  return {
    currentZindex,
    nextZindex,
    initialValue
  };
};

export default useZindex;
