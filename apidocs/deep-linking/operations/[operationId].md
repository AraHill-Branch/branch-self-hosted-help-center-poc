---
layout: page
title: Deep Linking API
---

<script setup lang="ts">
import { useRoute } from 'vitepress'

const route = useRoute()
const operationId = route.data.params.operationId
</script>

<ApiOperation :operationId="operationId" />
