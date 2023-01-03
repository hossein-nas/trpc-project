<template>
    <div class="container mx-auto" v-if="data">
        {{ data }}
    </div>
</template>

<script setup lang="ts">
import { useHello } from './Queries'
const { data } = useHello()
</script>
