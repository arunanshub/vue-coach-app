<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import RequestItem from '@/components/requests/RequestItem.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import { useRequestsStore } from '@/stores/requests'

const requestsStore = useRequestsStore()
const { requestsForCurrentCoach } = storeToRefs(requestsStore)

const errorMessage = ref<string>()
function loadRequests() {
  errorMessage.value = undefined
  requestsStore.loadRequests().catch((error: Error) => {
    errorMessage.value = error.message
  })
}

loadRequests()
</script>

<template>
  <section>
    <BaseDialog
      :show="!!errorMessage"
      title="An Error Occurred!"
      @close="loadRequests"
    >
      Failed to load requests: {{ errorMessage }}
    </BaseDialog>
    <BaseCard>
      <header>
        <h2>Requests Recieved</h2>
      </header>

      <BaseSpinner v-if="requestsStore.isLoading" />
      <ul v-else-if="requestsStore.hasRequestsForCurrentCoach">
        <RequestItem
          v-for="req in requestsForCurrentCoach"
          :email="req.userEmail"
          :messsage="req.message"
          :key="req.id"
        />
      </ul>

      <h3 v-else>You haven't recieved any requests yet.</h3>
    </BaseCard>
  </section>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
