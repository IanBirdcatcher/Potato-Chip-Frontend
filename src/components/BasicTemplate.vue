<script>
import { ref, onMounted } from "vue";
import Utils from "/src/config/utils";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {nextTick} from "vue";

export default {
  name: "BasicTemplate",
  props: {
    ContactInfo: { type: Array, required: true },
    Education: { type: Array, required: true },
    Experience: { type: Array, required: true },
    Interest: { type: Array, required: true },
    Link: { type: Array, required: true },
    Project: { type: Array, required: true },
    Award: { type: Array, required: true }, 
    Skill: { type: Object, required: true }, 
    Resume: { type: Array, required: true }
  },
  setup(props) {
    const user = ref(null);
    const name = ref("");
    const email = ref("");
    const address = ref("");
    const phoneNumber = ref("");
    const resumeRef = ref(null); // for the pdf
    const link = ref("");

    const loading = ref(true);

      onMounted(() => {
        console.log("THE BASIC TEMPLATE ON MOUNT");

        const storedUser = Utils.getStore("user");
        if (storedUser) {
          user.value = storedUser;
          name.value = `${storedUser.fName} ${storedUser.lName}`;
          email.value = storedUser.email;
          address.value = props.ContactInfo.Address || "";
          phoneNumber.value = props.ContactInfo.PhoneNumber || "";
          link.value = props.Link[0].link || "";  
        }
        loading.value = false;
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
        Link: props.Link,
        Education: props.Education,
        Experience: props.Experience,
        Award: props.Award,
        Skill: props.Skill,
        Projects: props.Project,
        resumeRef,
        generatePDF,
        Resume: props.Resume
      };
    },
};
</script>

<template v-if="!loading">
  <html lang="en">
  <body class="body">
    <div class="container">
      <header>
        <h1>{{ name }}</h1>
            <p>
              {{ address }} | {{ phoneNumber }} | 
              <a>{{ email }}</a> | 
              <a :href="link" target="_blank">{{ link }}</a>  
            </p>
      </header> 

      <!-- PROFESSIONAL SUMMARY Section -->
      <section id="summary">
        <h2>PROFESSIONAL SUMMARY</h2>
        <p>{{ Resume.profSummary }}</p>
      </section>

      <!-- Education Section -->
      <section id="education">
        <h2>EDUCATION</h2>
        <div v-for="Education in Education" :key="Education.id">
          <p>
            <strong>{{ Education.school }}</strong><br />
            {{ Education.degree }} {{ Education.major }} <br/>
            GPA: {{ Education.GPA }} <br />
            {{ new Date(Education.dateRange[0]).toLocaleDateString() }} - {{ new Date(Education.dateRange[Education.dateRange.length - 1]).toLocaleDateString() }}
          </p>
        </div>
      </section>
      <!-- Projects Section -->
      <section id="education">
        <h2>PROJECTS</h2>
        <div v-for="Project in Project" :key="Project.id">
          <p>
            <strong>{{ Project.projectName }}</strong><br />
            {{ Project.projectDesc }} <br />

          </p>
        </div>
      </section>

      <!-- Professional Experience Section -->
      <section id="experience">
        <h2>PROFESSIONAL EXPERIENCE</h2>
        <div v-for="Experience in Experience" :key="Experience.id" class="Experience">
          <h3>{{ Experience.jobTitle }}</h3>
          <p>{{ Experience.jobDesc }}</p>
        </div>
      </section>
      <div></div>
      <!-- Skills and Awards Section -->
      <section id="skills-awards">
        <h2>SKILLS & AWARDS</h2>
        <div>
          <h3 class="skillsAndAwards">Skills:</h3>
          <ul>
            <li v-for="skill in Skill" >{{ skill.skill }}</li>
          </ul>
        </div>
        <div>
          <h3 class="skillsAndAwards">Awards:</h3>
          <ul>
            <li v-for="award in Award" :key="award.awardId">{{ award.awardName }}</li>
          </ul>
        </div>
      </section>
    </div>
  </body>
  </html>
</template>

<style scoped>
.body {
  font-family: 'Times New Roman',Serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f9;
}

.container {
  max-width: 800px;
  margin: 20px auto;
  background: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skillsAndAwards {
  font-size: 14px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

header p {
  font-size: 16px;
  color: #555;
}

header a {
  color: #0077cc;
  text-decoration: none;
}

/* Section Titles */
section h2 {
  font-size: 20px;
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  color: #222;
}

#education p {
  font-size: 16px;
  margin-bottom: 10px;
}

#education strong {
  font-weight: bold;
}

#experience h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

#skills-awards ul {
  margin: 0;
  padding-left: 20px;
  font-size: 16px;
}

#skills-awards ul li {
  margin-bottom: 5px;
}
</style>
