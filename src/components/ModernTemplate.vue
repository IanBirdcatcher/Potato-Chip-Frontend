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
    Link: { type: Object, required: true },
    Project: { type: Array, required: true },
    Award: { type: Array, required: true },
    Skill: { type: Array, required: true },
    Resume: { type: Array, required: true }
  },
  setup(props) {
    const user = ref(null);
    const name = ref("");
    const email = ref("");
    const address = ref("");
    const phoneNumber = ref("");
    const resumeRef = ref(null); // for the PDF export

    onMounted(() => {
      const storedUser = Utils.getStore("user");
      if (storedUser) {
        user.value = storedUser;
        name.value = `${storedUser.fName} ${storedUser.lName}`;
        email.value = storedUser.email;
        address.value = props.ContactInfo.Address || "No address provided";
        phoneNumber.value = props.ContactInfo.PhoneNumber || "No phone number provided";
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
        pdf.save("resume.pdf");
      });
    };

    return {
      user,
      name,
      email,
      address,
      phoneNumber,
      Link: props.Link.Link,
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
        <a :href="Link" target="_blank" rel="noopener noreferrer">{{ Link }}</a>
      </p>
    </header>
    <section>
      <h2>Objective</h2>
      <p>{{ Resume.ProfSummary }}</p>
    </section>
    <section>
      <h2>Education</h2>
      <div class="education" v-for="Education in Education" :key="Education.id">
        <h3>{{ Education.SchoolName }}</h3>
        <p>{{ new Date(Education.Date[0]).toLocaleDateString() }} - {{ new Date(Education.Date[Education.Date.length - 1]).toLocaleDateString() }}</p>
        <p>{{ Education.Degree }} | {{ Education.Major }}</p>
        <p>GPA: {{ Education.GPA }}</p>
      </div>
    </section>
    <section>
      <h2>Experience</h2> 
      <div class="Experience" v-for="Experience in Experience" :key="Experience.id">
        <h3>{{Experience.Title }}, {{ Experience.Organization }}</h3>
        <p>{{ new Date(Experience.Date[0]).toLocaleDateString() }} - {{ new Date(Experience.Date[Experience.Date.length - 1]).toLocaleDateString() }}</p>
        <p>{{ Experience.JobDescription }}</p>
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
