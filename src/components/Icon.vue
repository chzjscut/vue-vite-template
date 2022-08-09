<template>
  <span ref="elRef" :class="[$attrs.class, 'anticon']"></span>
</template>

<script lang="ts">
  import { renderSVG } from "@iconify/iconify";
  import { watch, defineComponent, ref, reactive, unref, onMounted, nextTick } from 'vue'

  export default defineComponent({
    name: 'Icon',
    props: {
      icon: String
    },
    setup(props) {
      const elRef = ref<Element>();

      const update = async () => {
        const el = unref(elRef);
        const icon = props.icon;
        if(!el) return;
        await nextTick();
        if(!icon) return;
        const svg = renderSVG(icon, {});
        if(svg) {
          el.textContent = '';
          el.appendChild(svg);
        } else {
          const span = document.createElement('span');
          span.className = 'iconify';
          span.dataset.icon = icon;
          el.textContent = '';
          el.appendChild(span);
        }
      }

      watch(() => props.icon, update, { flush: 'post' });

      onMounted(update);

      return {
        elRef,
      }
    }
  })
</script>