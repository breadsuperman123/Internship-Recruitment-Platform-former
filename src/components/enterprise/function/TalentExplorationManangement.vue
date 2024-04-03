<template>
  <div class="main-container">
    <div v-if="showChatPage">
      <chat-page :chatRecord="selectedChatRecord" @back="goToRecordPage" />
    </div>
    <div v-else>
      <record-page :chatRecords="chatRecords" @selectChat="goToChatPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ChatPage from "@/components/enterprise/function/chat/ChatPage.vue";
import RecordPage from "@/components/enterprise/function/chat/RecordPage.vue";
import { ChatRecord } from "@/types/vue";

const chatRecords = ref<ChatRecord[]>([
  {
    id: '1',
    name: 'Alice',
    lastMessage: 'Hello!',
    avatar: 'https://example.com/avatar1.png'
  },
  {
    id: '2',
    name: 'Bob',
    lastMessage: 'Hi there!',
    avatar: 'https://example.com/avatar2.png'
  },
  // Add more chat records here...
]);

const selectedChatRecord = ref<ChatRecord | null>(null);

const showChatPage = computed(() => !!selectedChatRecord.value);

function goToChatPage(chatRecord: ChatRecord) {
  selectedChatRecord.value = chatRecord;
}

function goToRecordPage() {
  selectedChatRecord.value = null;
}
</script>

<style scoped>
.main-container {
  padding: 20px;
}
</style>
