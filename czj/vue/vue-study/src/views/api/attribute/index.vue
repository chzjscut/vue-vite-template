<template>
  <div class="content">
    <!-- 
      key
      *ref
      is
      *slot
      *slot-scope
      *scope
      -->
    <div class="page-title">特殊 attribute</div>
    <div class="tags">
      <tag
        v-for="tag in specialAttrs"
        :key="tag"
        :tag="tag"
        :activeTag="currentAttr"
        @select="onSelect(tag)"
      />
    </div>
    <section-module :title="`attribute: ${currentAttr}`">
      <template v-if="currentAttr === 'key'">
        <template v-if="loginType === 'username'">
          <label>姓名：</label>
          <input placeholder="输入姓名" key="username-input" v-if="useKey" />
          <input placeholder="输入姓名" v-else />
        </template>
        <template v-else>
          <label>手机号码：</label>
          <input placeholder="输入手机号码" key="email-input" v-if="useKey" />
          <input placeholder="输入手机号码" v-else />
        </template>
        <el-button
          size="mini"
          @click="loginType = loginType === 'username' ? 'email' : 'username'"
        >切换登录方式</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="useKey = !useKey"
        >{{useKey ? '不' : ''}}使用key</el-button>
        <div class="mt20">
          Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
          本例中，正常情况下切换登录方式时，不会清除用户已经输入的内容，因为两个模板使用了相同的元素，
          input元素不会被替换掉——仅仅是替换了它的 placeholder。<br>
          如果想要每次切换时重新渲染输入框，则需要在每个input中添加一个具有唯一值的 key attribute即可。
        </div>
      </template>
      <template v-if="currentAttr === 'is'">
        <is-attr />
      </template>
      <template v-if="currentAttr === 'ref'">
        <ref-attr />
      </template>
    </section-module>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Tag from '@/components/Tag.vue';
import IsAttr from './components/is-attr/index.vue';
import RefAttr from './components/ref-attr/index.vue';

const mixins = {
  created() {
    console.log(1)
  },
  mounted() {
    console.log(2)
  }
}

export default Vue.extend({
  name: 'AttributeIndex',
  mixins: [mixins],
  //delimiters: ['${', '}'],
  components: {
    Tag,
    IsAttr,
    RefAttr
  },
  data() {
    return {
      specialAttrs: ['key', 'ref', 'is', 'slot', 'slot-scope', 'scope'],
      currentAttr: 'key',
      useKey: false,
      loginType: 'username',
      userName: '',
      email: ''
    }
  },
  created() {
    console.log(11)
  },
  mounted() {
    console.log(22);
    this.$nextTick(function() {
      console.log(this)
    })
  },
  methods: {
    onSelect(value: string) {
      this.currentAttr = value;
    }
  }
});
</script>
<style lang="scss" scoped>
</style>