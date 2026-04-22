---
aside: false
outline: false
pageClass: api-operation-page
title: QR Code API
---

<script setup lang="ts">
import { useRoute } from 'vitepress'

const route = useRoute()
const operationId = route.data.params.operationId
</script>

<ApiOperation :operationId="operationId" />
