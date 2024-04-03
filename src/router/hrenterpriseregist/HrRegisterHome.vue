<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import router from "@/router";

const name = ref('');
const creditCode = ref('');
const username = ref('');
const password = ref('');
const phone = ref('');
const email = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const file = ref(null);
const headUrl = ref('');

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const usernameAvailability = ref(null);

const checkUsernameAvailability = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/checkHrUsername?username=${username.value}`);
    if (response.data.data == true) {
      usernameAvailability.value = 'Username available';
    } else {
      console.log(response.data)
      console.log(response.data.data)
      usernameAvailability.value = 'Username already taken';
    }
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

const submitRegistration = async () => {
  // Check if all fields are filled
  if (!name.value || !creditCode.value || !username.value || !password.value || !confirmPassword.value || !phone.value || !email.value) {
    alert('所有字段都需要填写。');
    return;
  }

  console.log("企业名称", name.value)
  console.log("社会信用代码", creditCode.value)
  console.log("用户名", username.value)
  console.log("密码", password.value)
  console.log("电话", phone.value)
  console.log("邮箱", email.value)

  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致，请重新输入。');
    return;
  }

  // Upload file and get the URL
  const response1 = await axios.post("http://localhost:8081/upload", {
    file: file.value
  }, {
    headers: {
      'Content-Type': 'multipart/form-data' // Ensure correct Content-Type header
    }
  });
  headUrl.value = response1.data.data;

  try {
    const response = await axios.post('http://localhost:8081/hrRegister', {
      username: username.value,
      password: password.value,
      headUrl: headUrl.value,
      enterprise: {
        name: name.value,
        creditCode: creditCode.value
      },
      phone: phone.value,
      email: email.value
    });

    // Handle response data
    const responseCode = response.data.code
    if (responseCode == 0) {
      console.log(response.data)
      alert(response.data.data)
      return;
    }
    alert(response.data.data)
    console.log(response.data)
    return router.push("/enterpriseLogin");
  } catch (error) {
    console.error(error);
    // Handle error
  }
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="submitRegistration" class="registration-form">
      <h2>HR注册</h2>
      <input v-model="name" type="text" placeholder="公司名称" />
      <input v-model="creditCode" type="text" placeholder="信用代码" />
      <input
          v-model="username"
          type="text"
          placeholder="用户名"
          @input="checkUsernameAvailability"
      />
      <div v-if="usernameAvailability !== null">
        {{ usernameAvailability }}
      </div>
      <div class="password-container">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="密码" />
        <span class="toggle-password" @click="togglePasswordVisibility">👁️</span>
      </div>
      <div class="password-container">
        <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="确认密码" />
        <span class="toggle-confirm-password" @click="toggleConfirmPasswordVisibility">👁️</span>
      </div>
      <input v-model="phone" type="text" placeholder="电话" />
      <input v-model="email" type="email" placeholder="邮箱" />
      <div>
        <label for="file-upload" class="custom-file-upload">
          <i class="fa fa-cloud-upload"></i> hr头像
        </label>
        <input id="file-upload" type="file" @change="file = $event.target.files[0]" accept="*.*" />
      </div>
      <button type="submit">提交注册</button>
    </form>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

.password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.toggle-confirm-password {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.registration-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
}

input, textarea {
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #23a6d5;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #23d5ab;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
