<template>
    <!-- 第一块 -->
    <div class="block">
      <div ref="contentContainer" class="layout-container">
        <div class="block">
          <div class="contentHeader">
            <h2 id="eduInfo">教育信息</h2>
            <a-button type="primary" shape="circle" @click="eduInfoEdit">{{ eduInfoEditMode ? '完成' : '编辑' }}</a-button>
            <!--<button @click="toggleEditMode">{{ editMode ? '取消' : '编辑' }}</button>-->
          </div>
          <div v-if="!eduInfoEditMode">
            <a-card style="width: 300px">
            <p>{{ eduInfo.schoolName || '未填写' }} | {{ eduInfo.major || '未填写' }}</p>
            <!-- GPA和成绩排名 -->
            <p>{{ eduInfo.score || '未填写' }} | {{ eduInfo.rank || '未填写' }}</p>
            <!-- 在校时间和学历 -->
            <p>{{ eduInfo.date || '未填写' }} | {{ eduInfo.education || '未填写' }}</p>
            <!-- 主修课程描述 -->
            <p>{{ eduInfo.lessonDescription || '未填写' }}</p>
            </a-card>
          </div>
          <div class="form-container" v-if="eduInfoEditMode">
            <a-form :model="eduInfo" :label-col="labelCol" :wrapper-col="wrapperCol" v-if="eduInfoEditMode" @submit.prevent="saveEduInfo">
              <a-row>
                <a-col :span="12">
                  <a-form-item label="学校">
                    <a-input v-model:value="eduInfo.schoolName" size="large" />
                  </a-form-item>
                </a-col>
                <a-col :span="12" >
                  <a-form-item label="专业">
                    <a-input v-model:value="eduInfo.major" size="large" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-item label="GPA">
                    <a-input v-model:value="eduInfo.score" size="large" />
                  </a-form-item>
                </a-col>
                <a-col :span="12" >
                  <a-form-item label="成绩排名">
                      <a-select ref="select" v-model:value="eduInfo.rank" size="large">
                        <a-select-option value="前10%">前10%</a-select-option>
                        <a-select-option value="前25%">前25%</a-select-option>
                        <a-select-option value="前50%" >前50%</a-select-option>
                        <a-select-option value="其他">其他</a-select-option>
                      </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-item label="在校时间">
                    <a-range-picker v-model:value="eduInfo.date" />
                  </a-form-item>
                </a-col>
                <a-col :span="12" >
                  <a-form-item label="学历">
                    <a-select ref="select" v-model:value="eduInfo.education" size="large">
                      <a-select-option value="大专">大专</a-select-option>
                      <a-select-option value="本科">本科</a-select-option>
                      <a-select-option value="硕士" >硕士</a-select-option>
                      <a-select-option value="博士">博士</a-select-option>
                      <a-select-option value="其他">其他</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24" >
                  <a-form-item label="主修课程描述">
                    <a-textarea v-model:value="eduInfo.lessonDescription" placeholder="请简要描述您的主修课程" :rows="4" />
                    <!--                  <a-input v-model:value="practiceInfo.jobContent" size="large"/>-->
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
        </div>
        </div>
      </div>
    </div>
    <!-- 横线 -->
    <div class="divider"></div>
    <!-- 第二块 -->
  <div class="block">
    <div ref="contentContainer" class="layout-container">
      <div class="block">
        <div class="contentHeader">
          <h2 id="practiceInfo">实习经历</h2>
          <a-button type="primary" shape="circle" @click="addPractice">添加</a-button>
        </div>
        <div v-if="practiceControl.condition">
          <div v-for="(practice, index) in practiceInfo" :key="index">
            <a-card style="width: 600px">
          <p>{{ practice.enterpriseName || '未填写' }} | {{ practice.jobName || '未填写' }}</p>
          <!-- GPA和成绩排名 -->
          <p>{{ practice.date || '未填写' }} </p>
          <!-- 主修课程描述 -->
          <p>{{ practice.jobContent || '未填写' }}</p>
              <a-row>
                <a-col :span="2">
                  <a-button type="primary" shape="circle" @click="PracticeEdit(index) ">编辑</a-button>
                </a-col>
                <a-col :span="2">
                  <a-button type="primary" shape="circle"  @click="deletePractice(index)" >删除</a-button>
                </a-col>
              </a-row>
            </a-card>
        </div>
        </div>
          <div class="form-container" v-if="!practiceControl.condition">
            <a-form :model="practiceInfo" :label-col="labelCol" :wrapper-col="wrapperCol" v-if="!practiceControl.condition" @submit.prevent="savePracticeInfo">
              <a-row>
                <a-col :span="12">
                  <a-form-item label="公司名称">
                    <a-input v-model:value="practiceInfo[practiceControl.index].enterpriseName" size="large" />
                  </a-form-item>
                </a-col>
                <a-col :span="12" >
                  <a-form-item label="职位名称">
                    <a-input v-model:value="practiceInfo[practiceControl.index].jobName" size="large" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12" >
                  <a-form-item label="起止时间">
                    <a-range-picker v-model:value="practiceInfo[practiceControl.index].date" size="large"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24" >
                <a-form-item label="工作内容">
                  <a-input v-model:value="practiceInfo[practiceControl.index].jobContent" size="large"/>
                </a-form-item>
                </a-col>
              </a-row>
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="PracticeEdit(projectControl.index)">保存</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
    </div>
  </div>

    <!-- 横线 -->
    <div class="divider"></div>
    <!-- 第三块 -->
  <div class="block">
    <div ref="contentContainer" class="layout-container">
      <div class="block">
        <div class="contentHeader">
          <h2 id="organizationInfo">社团/组织经历</h2>
          <a-button type="primary" shape="circle" @click="addOrganization">添加</a-button>
        </div>
        <div v-if="organizationControl.condition">
          <div v-for="(organization, index) in organizationInfo" :key="index">
            <a-card style="width: 600px">
          <p>{{ organization.organizationName || '未填写' }} | {{ organization.jobName || '未填写' }}</p>
          <!-- 经历时间 -->
          <p>{{ organization.date || '未填写' }} </p>
          <!-- 主要工作描述 -->
          <p>{{ organization.jobContent || '未填写' }}</p>
              <a-row>
                <a-col :span="2">
                  <a-button type="primary" shape="circle" @click="organizationEdit(index) ">编辑</a-button>
                </a-col>
                <a-col :span="2">
                  <a-button type="primary" shape="circle"  @click="deleteOrganization(index)" >删除</a-button>
                </a-col>
              </a-row>
            </a-card>
          </div>
        </div>
        <div class="form-container" v-if="!organizationControl.condition">
          <a-form :model="organizationInfo" :label-col="labelCol" :wrapper-col="wrapperCol" v-if="!organizationControl.condition" @submit.prevent="saveOrganizationInfo">
            <a-row>
              <a-col :span="12">
                <a-form-item label="社团/组织名称">
                  <a-input v-model:value="organizationInfo[organizationControl.index].organizationName" size="large" />
                </a-form-item>
              </a-col>
              <a-col :span="12" >
                <a-form-item label="担任职务">
                  <a-input v-model:value="organizationInfo[organizationControl.index].jobName" size="large" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="14" >
                <a-form-item label="起止时间">
                  <a-range-picker v-model:value="organizationInfo[organizationControl.index].date" size="large"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24" >
                <a-form-item label="工作内容">
                  <a-textarea v-model:value="organizationInfo[organizationControl.index].jobContent" placeholder="请简要描述您的社团工作经历" :rows="4" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="organizationEdit(projectControl.index)">保存</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
    <!-- 横线 -->
    <div class="divider"></div>
    <!-- 第四块 -->
  <div class="block">
    <div ref="contentContainer" class="layout-container">
      <div class="block">
        <div class="contentHeader">
          <h2 id="projectInfo">学术/项目经历</h2>
          <a-button type="primary" shape="circle" @click="addProject">添加</a-button>
        </div>
        <div v-if="projectControl.condition">
          <div v-for="(project, index) in projectInfo" :key="index">
            <a-card style="width: 600px">
          <p>{{ project.projectName || '未填写' }} | {{ project.jobName || '未填写' }}</p>
          <!-- 经历时间 -->
          <p>{{ project.date || '未填写' }} </p>
          <!-- 主要工作描述 -->
          <p>{{ project.jobContent || '未填写' }}</p>
          <a-row>
            <a-col :span="2">
              <a-button type="primary" shape="circle" @click="projectEdit(index) ">编辑</a-button>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" shape="circle"  @click="deleteProject(index)" >删除</a-button>
            </a-col>
          </a-row>
        </a-card>
      </div>
        </div>

        <div class="form-container" v-if="!projectControl.condition">
          <a-form :model="projectInfo" :label-col="labelCol" :wrapper-col="wrapperCol" v-if="!projectControl.condition" @submit.prevent="saveProjectInfo">
            <a-row>
              <a-col :span="12">
                <a-form-item label="项目名称">
                  <a-input v-model:value="projectInfo[projectControl.index].projectName" size="large" />
                </a-form-item>
              </a-col>
              <a-col :span="12" >
                <a-form-item label="担任职务">
                  <a-input v-model:value="projectInfo[projectControl.index].jobName" size="large" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="14" >
                <a-form-item label="起止时间">
                  <a-range-picker v-model:value="projectInfo[projectControl.index].date" size="large"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24" >
                <a-form-item label="工作内容">
                  <a-textarea v-model:value="projectInfo[projectControl.index].jobContent" placeholder="请简要描述您的项目工作" :rows="4" />
                  <!--                  <a-input v-model:value="practiceInfo.jobContent" size="large"/>-->
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="projectEdit(projectControl.index)">保存</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
<!--  获奖经历块-->
  <div class="block">
    <div ref="contentContainer" class="layout-container">
      <div class="block">
        <div class="contentHeader">
          <h2 id="certificationInfo">获奖经历</h2>
          <a-button type="primary" shape="circle" @click="addCertificate">添加</a-button>
        </div>
        <div v-if="certificateControl.condition">
        <div v-for="(certificate, index) in certificates" :key="index">
          <a-card style="width: 600px">
            <p>{{ certificate.certificateName || '未填写' }} | {{ certificate.date || '未填写' }}</p>
            <a-row>
              <a-col :span="2">
            <a-button type="primary" shape="circle" @click="certificateEdit(index) ">编辑</a-button>
              </a-col>
              <a-col :span="2">
                <a-button type="primary" shape="circle"  @click="deleteCertificate(index)" :offset="4">删除</a-button>
              </a-col>
            </a-row>
          </a-card>
        </div>
      </div>
        <div class="form-container" v-if="!certificateControl.condition">
          <a-form :model="certificateInfo" :label-col="labelCol" :wrapper-col="wrapperCol"  @submit.prevent="saveCertificateInfo">
            <a-row>
              <a-col :span="12">
                <a-form-item label="奖项名称">
                  <a-input v-model:value="certificates[certificateControl.index].certificateName" size="large" />
                </a-form-item>
              </a-col>
              <a-col :span="12" >
                <a-form-item label="起止时间">
                  <a-range-picker v-model:value="certificates[certificateControl.index].date" size="large"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="certificateEdit(certificateControl.index)">保存</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
    <!-- 横线 -->
    <div class="divider"></div>
    <!-- 第六块 -->
    <div class="block">
      <h2 id="skillInfo">个人技能</h2>
      <p>Option 1 Content</p>
    </div>
    <!-- 横线 -->
    <div class="divider"></div> <!-- 第一块 -->
    <div class="block">
      <h2>志愿经历</h2>
      <p>Option 1 Content</p>
    </div>

</template>

<style>
.layout-container {
  display: flex;
  flex-wrap: wrap;
}

.block {
  flex: 1 0 100%; /* 每块占据一行 */
  padding: 10px;
  box-sizing: border-box;
}

.divider {
  flex-basis: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 5px 0;
}
.contentHeader {
  display: flex;
  justify-content: space-between;
}
.form-container {
  background-color: #f0f0f0; /* 灰色背景底色 */
  padding: 20px;
  border-radius: 5px;
}


</style>
<script setup lang="ts">
import {reactive, ref, toRaw} from 'vue';
import type { UnwrapRef } from 'vue';

import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
const eduInfoEditMode = ref(false);//教育信息控制编辑
const practiceControl = ref({
  index:"",
  condition:"false"
});//实习经历控制编辑
const organizationControl = ref({
  index:"",
  condition:"false"
});//校园组织经历控制编辑
const projectControl = ref({
  index:"",
  condition:"false"
});//项目经历控制编辑
const certificateControl=ref({
  index:"",
  condition:"false"
});
const eduInfo = ref({
  schoolName: '',
  major: '',
  rank:'',
  date:ref<RangeValue>(),
  education:'',
  lessonDescription:'',
  score: ''
});
const practiceInfo = ref([
    {
  enterpriseName: '',
  jobName: '',
  date:ref<RangeValue>(),
  jobContent: ''
}]);
const organizationInfo = ref([
    {
  organizationName: '',
  jobName: '',
  date:ref<RangeValue>(),
  jobContent: ''
}]);
const projectInfo = ref([
    {
  projectName: '',
  jobName: '',
  date:ref<RangeValue>(),
  jobContent: ''
}
]);
const certificates = ref([
  {
    certificateName: '',
    date: ref<RangeValue>()
  }
]);
const addPractice = () => {
  practiceInfo.value.push({
    enterpriseName: '',
    jobName: '',
    date:ref<RangeValue>(),
    jobContent: ''
  });
};
const addOrganization = () => {
  organizationInfo.value.push({
    organizationName: '',
    jobName: '',
    date:ref<RangeValue>(),
    jobContent: ''
  });
};
const addProject = () => {
  projectInfo.value.push({
    projectName: '',
    jobName: '',
    date:ref<RangeValue>(),
    jobContent: ''
  });
};
const addCertificate = () => {
  certificates.value.push({
    certificateName: '',
    date: null
  });
};

// 用来判断是否处于编辑状态
const eduInfoEdit = () => {
  eduInfoEditMode.value = !eduInfoEditMode.value;
};
const PracticeEdit = (index:number) => {
  practiceControl.value.condition = !practiceControl.value.condition;
  practiceControl.value.index= index;
};
const organizationEdit = (index:number) => {
  organizationControl.value.condition = !organizationControl.value.condition;
  organizationControl.value.index= index;
};
const projectEdit = (index:number) => {
  projectControl.value.condition = !projectControl.value.condition;
  projectControl.value.index= index;
};
const certificateEdit = (index: number) => {
  certificateControl.value.condition = !certificateControl.value.condition;
  certificateControl.value.index= index;
};
const deletePractice = (index: number) => {
  practiceInfo.value.splice(index, 1);
};
const deleteOrganization = (index: number) => {
  organizationInfo.value.splice(index, 1);
};
const deleteCertificate = (index: number) => {
  certificates.value.splice(index, 1);
};
const deleteProject = (index: number) => {
 projectInfo.value.splice(index, 1);
};

const saveCertificate = (index: number, certificate: any) => {
  // 这里是保存获奖经历信息的逻辑，与之前保存基本信息的逻辑类似
  console.log('保存获奖经历信息:', certificate);
};
//上述这一块都是
const savePracticeInfo = () => {
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', practiceInfo.value);
  eduInfoEditMode.value = false; // 保存后退出编辑模式
};
const saveEduInfo = () => {
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', eduInfo.value);
  eduInfoEditMode.value = false; // 保存后退出编辑模式
};
const saveOrganizationInfo = () => {
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', organizationInfo.value);
  organizationEditMode.value = false; // 保存后退出编辑模式
};
const saveProjectInfo = () => {
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', projectInfo.value);
  projectEditMode.value = false; // 保存后退出编辑模式
};
const saveCertificateInfo = () => {
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', certificateInfo.value);
  certificateEditMode.value = false; // 保存后退出编辑模式
};
interface FormState {
  name: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const onSubmit = () => {
  console.log('submit!', toRaw(formState));
};
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
</script>