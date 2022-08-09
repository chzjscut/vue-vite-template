<template>
  <div>
    <Button @click="toRoleEdit">新增角色</Button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Button } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'SetupRole',
    components: {
      Button
    },
    setup() {
      const router = useRouter();

      const toRoleEdit = () => {
        router.push('./role-edit');
      }

      return {
        toRoleEdit
      }
    }
  });
</script>