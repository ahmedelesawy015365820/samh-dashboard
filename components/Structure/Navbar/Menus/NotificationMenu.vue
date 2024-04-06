<template>
  <div class="notification" @click.stop="show = !show">
    <NuxtImg
      preset="default"
      width="22"
      height="25"
      src="/icons/notification.svg"
      alt="notification"
    />
  </div>
</template>
<!-- :content="
        useAuthStore().user ? useAuthStore().user?.notificationLength || 0 : 0
      " -->
<script setup>
import { useAuthStore } from "@/stores/auth";
const props = defineProps({
  sticky: {
    type: Boolean,
    default: false,
  },
  header_nav: {
    type: Boolean,
    default: false,
  },
});

const show = ref(false);

const notifications = ref([
  {
    id: 1,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 2,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 3,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 4,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 5,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 6,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 7,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 8,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 9,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 10,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
  {
    id: 11,
    image: "/images/avatars/nav.svg",
    title: "عمر مؤمن",
    body: "هذا النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي, هذه النص مثال علي الكلام المكتوب في هذه المنطقة ولا يمثل اي محتوي حقيقي ",
    date: "2021-10-10",
  },
]);

const getData = async () => {
  const res = await useFetch("notifications").then((res) => {
    notifications.value = res.data;
  });
};
// getData();
</script>

<style lang="scss" scoped>
.notification {
  position: relative;
  cursor: pointer;

  img {
    margin-top: 5px;
  }
}
</style>
