<template>
  <!-- 第一块 -->
  <div class="block">
    <div ref="contentContainer" class="layout-container">
      <div class="block">
        <div class="contentHeader">
          <h2 id="eduInfo">教育信息</h2>
          </div>
        <div v-if="eduControl.condition">
          <div v-for="(edu, index) in eduInfo" :key="index">
            <a-card style="width: 600px">
              <p>{{ edu.schoolName || '未填写' }} | {{ edu.major || '未填写' }}</p>
              <!-- GPA和成绩排名 -->
              <p>{{ edu.score || '未填写' }} | {{ edu.rank || '未填写' }}</p>
              <!-- 在校时间和学历 -->
              <p> {{ formatDate(edu.startDate) || '未填写' }} —— {{ formatDate(edu.endDate) || '未填写' }}| {{ edu.education || '未填写' }}</p>
              <!-- 主修课程描述 -->
              <p>{{ edu.lessonDescription || '未填写' }}</p>
            </a-card>

          </div>
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
         </div>
        <div v-if="practiceControl.condition">
          <div v-for="(practice, index) in practiceInfo" :key="index">
            <a-card style="width: 600px">
              <p>{{ practice.enterpriseName || '未填写' }} | {{ practice.jobName || '未填写' }}</p>
              <!-- GPA和成绩排名 -->
              <p>{{ formatDate(practice.startDate) || '未填写' }} —— {{ formatDate(practice.endDate) || '未填写' }} </p>
              <!-- 主修课程描述 -->
              <p>{{ practice.jobContent || '未填写' }}</p>

            </a-card>
          </div>
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
           </div>
        <div v-if="organizationControl.condition">
          <div v-for="(organization, index) in organizationInfo" :key="index">
            <a-card style="width: 600px">
              <p>{{ organization.organizationName || '未填写' }} | {{ organization.jobName || '未填写' }}</p>
              <!-- 经历时间 -->
              <p>{{ formatDate(organization.startDate) || '未填写' }} —— {{ formatDate(organization.endDate) || '未填写' }}</p>
              <!-- 主要工作描述 -->
              <p>{{ organization.jobContent || '未填写' }}</p>

            </a-card>
          </div>
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
          </div>
        <div v-if="projectControl.condition">
          <div v-for="(project, index) in projectInfo" :key="index">
            <a-card style="width: 600px">
              <p>{{ project.projectName || '未填写' }} | {{ project.jobName || '未填写' }}</p>
              <!-- 经历时间 -->
              <p>{{ formatDate(project.startDate) || '未填写' }} —— {{ formatDate(project.endDate) || '未填写' }} </p>
              <!-- 主要工作描述 -->
              <p>{{ project.jobContent || '未填写' }}</p>

            </a-card>
          </div>
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
          </div>
        <div v-if="certificateControl.condition">
          <div v-for="(certificate, index) in certificates" :key="index">
            <a-card style="width: 600px">
              <p>{{ certificate.certificateName || '未填写' }} | {{ formatDate(certificate.startDate) || '未填写' }}</p>

            </a-card>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!-- 横线 -->

  <!-- 横线 -->
  <div class="divider"></div> <!-- 第一块 -->
  <div class="block">
    <div ref="contentContainer" class="layout-container">
      <div class="block">
        <div class="contentHeader">
          <h2 id="LocalResume">简历附件</h2>

        </div>
      </div>
      <a-upload
          v-model:file-list="fileList"
          name="file"
          action="http://localhost:8081/upload"
          :headers="headers"
          @change="handleChange"
      >
      </a-upload>
    </div>
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
import {onMounted, reactive, ref, toRaw} from 'vue';
import type { UnwrapRef } from 'vue';
import axios from 'axios';
import type { Dayjs } from 'dayjs';
import {dayjs} from "element-plus";
import {message, UploadChangeParam, UploadProps} from 'ant-design-vue';
type RangeValue = [Dayjs, Dayjs];
// const eduInfoEditMode = ref(false);//教育信息控制编辑
const eduControl = ref({
  index:"",
  condition:"false"
});//实习经
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
const eduInfo = ref([{
  schoolName: '',
  major: '',
  rank:'',
  startDate:ref<Dayjs>(),
  endDate:ref<Dayjs>(),
  education:'',
  lessonDescription:'',
  score: '',
  id:''
}]);
const practiceInfo = ref([
  {
    enterpriseName: '',
    jobName: '',
    startDate:ref<Dayjs>(),
    endDate:ref<Dayjs>(),
    id:'',
    jobContent: ''
  }]);
const organizationInfo = ref([
  {
    organizationName: '',
    jobName: '',
    startDate:ref<Dayjs>(),
    endDate:ref<Dayjs>(),
    id:'',
    jobContent: ''
  }]);
const projectInfo = ref([
  {
    projectName: '',
    jobName: '',
    startDate:ref<Dayjs>(),
    endDate:ref<Dayjs>(),
    jobContent: '',
    id:'',
  }
]);
const monthFormat = 'YYYY/MM/DD';
const certificates = ref([
  {
    certificateName: '',
    startDate: ref<Dayjs>(),
    id:''
  }
]);
const addEduInfo = () => {
  eduInfo.value.push({
    schoolName: '',
    major: '',
    rank:'',
    startDate:ref<Dayjs>(),
    endDate:ref<Dayjs>(),
    education:'',
    lessonDescription:'',
    score: '',
    id:''
  });
};
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
    startDate:ref<Dayjs>(),
    endDate:ref<Dayjs>(),
    jobContent: '',
    id:''
  });
};
const addProject = () => {
  projectInfo.value.push({
    projectName: '',
    jobName: '',
    startDate:ref<Dayjs>(),
    endDate:ref<Dayjs>(),
    jobContent: '',
    id:''
  });
};
const addCertificate = () => {
  certificates.value.push({
    certificateName: '',
    startDate: ref<Dayjs>()
  });
};

// 用来判断是否处于编辑状态
const eduInfoEdit = (index: number) => {
  eduControl.value.condition = !eduControl.value.condition;
  eduControl.value.index= index;
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
  certificateControl.value = {
    index: index,
    condition: !certificateControl.value.condition
  };
};


// 令牌处理
const jwtToken = localStorage.getItem("jwtToken")
const instance = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: false,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = `${jwtToken}`;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

const fileList = ref<UploadProps['fileList']>([
  {}
]);
// const fileList = ref([
// ]);
const headers = {
  Authorization:localStorage.getItem("jwtToken") ,
};
const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
    const response = info.file.response;
    console.log('data:',response.data)


    instance.post('/saveLocalResume', {
      resumeUrl:response.data,
      name:info.file.name,
      uid:info.file.uid
    })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    console.log('filelist:',fileList.value[0].name)
  } else if (info.file.status === 'error') {
    message.error(`${info.fileList} file upload failed.`);
    console.log(info.fileList)
  }
  else if(info.file.status === 'removed'){
    instance.post('/deleteLocalResume', {
      resumeUrl:info.file.response.data,
      name:info.file.name,
      uid:info.file.uid
    })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    console.log('name',info.file.name)
  }
};

// 令牌处理结束
const deleteEdu = (index: number) => {
  eduInfo.value.splice(index, 1);
  instance.post('/deleteEducation', {educationIndex:index})
      .then(response => {
        console.log(response.data);
        message.success('成功删除');
      })
      .catch(error => {
        console.error(error);
        message.error("删除失败");
      });
  setTimeout(selectEduInfo, 1000); // 2000 毫秒 = 2 秒
};
const deletePractice = (index: number) => {
  practiceInfo.value.splice(index, 1);
  instance.post('/deletePractice', {practiceIndex:index})
      .then(response => {
        console.log(response.data);
        message.success('成功删除');
      })
      .catch(error => {
        console.error(error);
        message.error("删除失败");
      });
  setTimeout(selectPracticeInfo, 1000); // 2000 毫秒 = 2 秒
};
const deleteOrganization = (index: number) => {
  organizationInfo.value.splice(index, 1);
  instance.post('/deleteOrganization', {organizationIndex:index})
      .then(response => {
        console.log(response.data);
        message.success('成功删除');
      })
      .catch(error => {
        console.error(error);
        message.error("删除失败");
      });
  setTimeout(selectOrganizationInfo, 1000); // 2000 毫秒 = 2 秒
};
const deleteCertificate = (index: number) => {
  certificates.value.splice(index, 1);
  instance.post('/deleteCertification', {
        certificationIndex:index
      }
  )
      .then(response => {
        console.log(response.data);
        message.success('成功删除');
      })
      .catch(error => {
        console.error(error);
        message.error("删除失败");
      });
  setTimeout(selectCertificateInfo, 1000); // 2000 毫秒 = 2 秒
};
const deleteProject = (index: number) => {
  projectInfo.value.splice(index, 1);
  instance.post('/deleteProject', {projectIndex:index})
      .then(response => {
        console.log(response.data);
        message.success('成功删除');
      })
      .catch(error => {
        console.error(error);
        message.error("删除失败");
      });
  setTimeout(selectProjectInfo, 1000); // 2000 毫秒 = 2 秒
};

//上述这一块都是
const savePracticeInfo = (index: number) => {
  // 在这里处理保存基本信息的逻辑
  practiceInfo.value[index].id=index;
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', practiceControl.value);
  practiceControl.value.condition = !practiceControl.value.condition;
  practiceControl.value.index= index;
  instance.post('/savePractice', {
        name:practiceInfo.value[index].enterpriseName,
        practiceIndex:practiceInfo.value[index].id,
        startDate:practiceInfo.value[index].startDate,
        overDate:practiceInfo.value[index].endDate,
        role:practiceInfo.value[index].jobName,
        performance:practiceInfo.value[index].jobContent
      }
  )
      .then(response => {
        console.log(response.data);
        message.success('成功保存');
      })
      .catch(error => {
        console.error(error);
        message.error("保存失败");
      });
};
const saveEduInfo = (index:number) => {
  // 在这里处理保存基本信息的逻辑
  eduInfo.value[index].id=index;
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', eduControl.value);
  eduControl.value.condition = !eduControl.value.condition;
  eduControl.value.index= index;
  instance.post('/saveEducation', {
        school:eduInfo.value[index].schoolName,
        educationIndex:eduInfo.value[index].id,
        startDate:eduInfo.value[index].startDate,
        overDate:eduInfo.value[index].endDate,
        rank:eduInfo.value[index].rank,
        score:eduInfo.value[index].score,
        education:eduInfo.value[index].education,
        major:eduInfo.value[index].major,
        lessonDescription:eduInfo.value[index].lessonDescription
      }
  )
      .then(response => {
        console.log(response.data);
        message.success('成功保存');
      })
      .catch(error => {
        console.error(error);
        message.error("保存失败");
      });

};
const saveOrganizationInfo = (index:number) => {

  // 在这里处理保存基本信息的逻辑
  organizationInfo.value[index].id=index;
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', organizationControl.value);
  organizationControl.value.condition = !organizationControl.value.condition;
  organizationControl.value.index= index;
  instance.post('/saveOrganization', {
        name:organizationInfo.value[index].organizationName,
        organizationIndex:organizationInfo.value[index].id,
        startDate:organizationInfo.value[index].startDate,
        overDate:organizationInfo.value[index].endDate,
        role:organizationInfo.value[index].jobName,
        statement:organizationInfo.value[index].jobContent
      }
  )
      .then(response => {
        console.log(response.data);
        message.success('成功保存');
      })
      .catch(error => {
        console.error(error);
        message.error("保存失败");
      });
};
const saveProjectInfo = (index:number) => {
  // 在这里处理保存基本信息的逻辑
  projectInfo.value[index].id=index;
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', certificateControl.value);
  projectControl.value.condition = !projectControl.value.condition;
  projectControl.value.index= index;
  instance.post('/saveProject', {
        name:projectInfo.value[index].projectName,
        projectIndex:projectInfo.value[index].id,
        startDate:projectInfo.value[index].startDate,
        overDate:projectInfo.value[index].endDate,
        role:projectInfo.value[index].jobName,
        performance:projectInfo.value[index].jobContent
      }
  )
      .then(response => {
        console.log(response.data);
        message.success('成功保存');
      })
      .catch(error => {
        console.error(error);
        message.error("保存失败");
      });

};

const saveCertificateInfo = (index:number) => {
  certificates.value[index].id=index;
  // 在这里处理保存基本信息的逻辑
  console.log('保存基本信息:', certificateControl.value);
  certificateControl.value.condition = !certificateControl.value.condition;
  certificateControl.value.index= index;
  instance.post('/certification', {
    name:certificates.value[index].certificateName,
    certificationIndex:certificates.value[index].id,
    startTime:certificates.value[index].startDate}
  )
      .then(response => {
        message.success('成功保存');
      })
      .catch(error => {
        console.error(error);
        message.error("保存失败");
      });
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

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

// 页面加载时发送请求查询获奖证书信息
onMounted(() => {
  selectEduInfo();
  selectPracticeInfo();
  selectProjectInfo();
  selectOrganizationInfo();
  selectCertificateInfo();
  selectLocalResumeInfo();
});
const selectEduInfo = async () =>{
  try {
    const response = await instance.get("/iniEducation")
    // certificates.value = response.data;
    response.data.data.forEach((item: { school: any; startDate: string | Dayjs | Date | null | undefined;educationIndex: number;overDate: string | Dayjs | Date | null | undefined; education:string;rank:string;major:string;score:number;lessonDescription:string}, index: number) => {
      const { school, startDate, educationIndex ,overDate,rank,score,major,education,lessonDescription} = item;
      eduInfo.value[index] = {
        schoolName:school,
        id:educationIndex,
        startDate:ref<Dayjs>(dayjs(startDate,'YYYY-MM-DD')),
        endDate:ref<Dayjs>(dayjs(overDate,'YYYY-MM-DD')),
        education:education,
        rank:rank,
        score:score,
        lessonDescription:lessonDescription,
        major:major
      };
    });
    console.log(response.data.data)
  }catch (e){
    console.log("error");
  }
}
const selectPracticeInfo = async () =>{
  try {
    const response = await instance.get("/iniPractice")
    response.data.data.forEach((item: { name: any; startDate: string | Dayjs | Date | null | undefined;practiceIndex: number;overDate: string | Dayjs | Date | null | undefined; role:string;performance:string}, index: number) => {
      const { name, startDate, practiceIndex ,overDate,role,performance} = item;
      practiceInfo.value[index] = {
        enterpriseName:name,
        id:practiceIndex,
        startDate:ref<Dayjs>(dayjs(startDate,'YYYY-MM-DD')),
        endDate:ref<Dayjs>(dayjs(overDate,'YYYY-MM-DD')),
        jobName:role,
        jobContent:performance
      };
    });
    console.log(response.data.data)
  }catch (e){
    console.log("error");
  }
}
const selectOrganizationInfo = async () =>{
  try {
    const response = await instance.get("/iniOrganization")
    // certificates.value = response.data;
    response.data.data.forEach((item: { name: any; startDate: string | Dayjs | Date | null | undefined;organizationIndex: number;overDate: string | Dayjs | Date | null | undefined; role:string;statement:string}, index: number) => {
      const { name, startDate, organizationIndex ,overDate,role,statement} = item;
      organizationInfo.value[index] = {
        organizationName:name,
        id:organizationIndex,
        startDate:ref<Dayjs>(dayjs(startDate,'YYYY-MM-DD')),
        endDate:ref<Dayjs>(dayjs(overDate,'YYYY-MM-DD')),
        jobName:role,
        jobContent:statement
      };
    });
    console.log(response.data.data)
  }catch (e){
    console.log("error");
  }
}
const selectProjectInfo = async () =>{
  try {
    const response = await instance.get("/iniProject")
    // certificates.value = response.data;
    response.data.data.forEach((item: { name: any; startDate: string | Dayjs | Date | null | undefined;projectIndex: number;overDate: string | Dayjs | Date | null | undefined; role:string;performance:string}, index: number) => {
      const { name, startDate, projectIndex ,overDate,role,performance} = item;
      projectInfo.value[index] = {
        projectName:name,
        id:projectIndex,
        startDate:ref<Dayjs>(dayjs(startDate,'YYYY-MM-DD')),
        endDate:ref<Dayjs>(dayjs(overDate,'YYYY-MM-DD')),
        jobName:role,
        jobContent:performance
      };
    });
    console.log(response.data.data)
  }catch (e){
    console.log("error");
  }
}
const selectCertificateInfo = async () =>{
  try {
    const response = await instance.get("/inicertificates")
    // certificates.value = response.data;
    response.data.data.forEach((item: { name: any; startTime: string | number | Dayjs | Date | null | undefined;certificationIndex: number }, index: number) => {
      const { name, startTime, certificationIndex } = item;
      certificates.value[index] = {
        certificateName: name,
        startTime:ref<Dayjs>(dayjs(startTime, 'YYYY-MM-DD')),
        id: certificationIndex
      };
    });
    console.log(response.data.data)
    console.log("hh")

  }catch (e){
    console.log("error");
  }
}
const selectLocalResumeInfo = async () =>{
  try {
    const response = await instance.get("/iniLocalResume")

    if (response.data.data.length === 0) {
      alert(0)

    } else {

      // 数据不为空的处理逻辑
      response.data.data.forEach((item: { name: any; resumeUrl: any; uid: any; }, index: string | number) => {
        const { name, resumeUrl, uid } = item;
        fileList.value[index] = {
          url: resumeUrl,
          name: name,
          uid: uid,
          status: 'done',
        };
      });
    }
    console.log("resume")
    console.log(response.data.data)
  }catch (e){
    console.log("error");
  }
}
const formatDate = (date: string | number | Date | ref<Dayjs>) => {
  if (!date) return ''; // 如果日期不存在，返回空字符串
  const formattedDate = new Date(date).toISOString().split('T')[0]; // 将日期转换为 ISO 格式，然后提取日期部分
  return formattedDate;
};
</script>