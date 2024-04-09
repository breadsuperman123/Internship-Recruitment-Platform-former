<template>
  <div class="components-page-header-demo-content">
    <a-page-header
        title="Enterprise Name"
        class="site-page-header"
        sub-title="enterprise description"
        :avatar="{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }"
    >
      <template #extra>
        <a-button key="1" type="primary">Primary</a-button>
      </template>
      <a-row class="content">
        <div style="flex: 1">
          <p>
            Ant Design interprets the color system into two levels: a system-level color system and
            a product-level color system.
          </p>
          <p>
            Ant Design&#x27;s design team preferred to design with the HSB color model, which makes
            it easier for designers to have a clear psychological expectation of color when
            adjusting colors, as well as facilitate communication in teams.
          </p>
        </div>
        <div class="image">
          <img
              src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
              alt="content"
              style="width: 100%"
          />
        </div>
      </a-row>
    </a-page-header>
  </div>
</template>
<script lang="ts" setup>

</script>




<style scoped>
#components-page-header-demo-content .image {
  margin: 0 0 0 60px;
  display: flex;
  align-items: center;
}

#components-page-header-demo-content .ant-page-header-rtl .image {
  margin: 0 60px 0 0;
}

#components-page-header-demo-content .content p {
  margin-bottom: 1em;
  color: rgba(0, 0, 0, 0.85);
  overflow-wrap: break-word;
}

@media (max-width: 768px) {
  #components-page-header-demo-content .image {
    flex: 100%;
    margin: 24px 0 0;
  }
}
</style>
