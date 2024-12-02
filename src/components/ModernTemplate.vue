<script>
import { ref, onMounted } from "vue";
import Utils from "/src/config/utils";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "BasicTemplate",
  props: {
    ContactInfo: { type: Object, required: true },
    Education: { type: Array, required: true },
    Experience: { type: Array, required: true },
    Interest: { type: Array, required: true },
    Link: { type: Array, required: true },
    Project: { type: Array, required: true },
    Award: { type: Array, required: true },
    Skill: { type: Array, required: true },
    Resume: { type: Object, required: true }
  },
  setup(props) {
    const user = ref(null);
    const name = ref("");
    const email = ref("");
    const address = ref("");
    const phoneNumber = ref("");
    const link = ref("");


    const resumeRef = ref(null); // for the PDF thing

    onMounted(() => {
      const storedUser = Utils.getStore("user");
      if (storedUser) {
        user.value = storedUser;
        name.value = `${storedUser.fName} ${storedUser.lName}`;
        email.value = storedUser.email;
        address.value = props.ContactInfo.Address || "";
        phoneNumber.value = props.ContactInfo.PhoneNumber || "";
        link.value = props.Link[0].link || "";
      }
    });

    const generatePDF = () => {
      const resumeElement = resumeRef.value;

      html2canvas(resumeElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("MyResume.pdf");
      });
    };

    return {
      user,
      name,
      email,
      address,
      phoneNumber,
      link,
      Education: props.Education,
      Experience: props.Experience,
      Award: props.Award,
      Skill: props.Skill,
      Projects: props.Project,
      resumeRef,
      generatePDF,
      Resume: props.Resume,
    };
  },
};
</script>
<template>
  <div ref="resumeRef" class="resume-container">
    <header>
      <h1>{{ name }}</h1>
      <p>
        {{ address }} | {{ phoneNumber }} | 
        <a>{{ email }}</a> |  
        <a :href="link" target="_blank">{{ link }}</a>
      </p>
    </header>
    <section>
      <h2>Objective</h2>
      <p>{{ Resume.profSummary }}</p>
    </section>
    <section>
      <h2>Education</h2>
      <div class="education" v-for="Education in Education" :key="Education.educationId">
        <h3>{{ Education.school }}</h3>
        <p>{{ new Date(Education.dateRange[0]).toLocaleDateString() }} - {{ new Date(Education.dateRange[Education.dateRange.length - 1]).toLocaleDateString() }}</p>
        <p>{{ Education.degree }} | {{ Education.major }}</p>
        <p>GPA: {{ Education.GPA }}</p>
      </div>
    </section>
    <section>
      <div>
        <h3 class="skillsAndAwards">Skills:</h3>
          <ul>
            <li v-for="(skill, index) in Skill" :key="index">{{ skill.skill }}</li>
          </ul>
    </div>
    </section>
    <section>
      <h2>Experience</h2> 
      <div class="Experience" v-for="Experience in Experience" :key="Experience.experienceId">
        <h3>{{Experience.jobTitle }}</h3>
        <p>{{ new Date(Experience.dateRange[0]).toLocaleDateString() }} - {{ new Date(Experience.dateRange[Experience.dateRange.length - 1]).toLocaleDateString() }}</p>
        <p>{{ Experience.jobDesc }}</p>
      </div>
    </section>

  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  background-color: #f4f4f9;
  color: #333;
}

.resume-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 24px;
  margin: 0;
}

header p {
  margin: 5px 0;
}

header a {
  color: #0073e6;
  text-decoration: none;
}

header a:hover {
  text-decoration: underline;
}

section {
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}

.education, .experience {
  margin-bottom: 15px;
}

.education h3, .experience h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.education p, .experience p {
  margin: 2px 0;
}

ul {
  margin: 5px 0 0 20px;
  padding: 0;
}

ul li {
  margin: 5px 0;
}
</style>
