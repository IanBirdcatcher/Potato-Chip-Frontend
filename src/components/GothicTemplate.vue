<script>
import { ref, onMounted } from "vue";
import Utils from "/src/config/utils";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "GothicTemplate",
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
    const link = ref("");
    const linkName = ref("");

    const selectedSkills = ref([]);


    const resumeRef = ref(null); // for the pdf

    onMounted(() => {
      const storedUser = Utils.getStore("user");
      if (storedUser) {
        user.value = storedUser;
        name.value = `${storedUser.fName} ${storedUser.lName}`;
        email.value = storedUser.email;
        address.value = props.ContactInfo.Address || "No address provided";
        phoneNumber.value = props.ContactInfo.PhoneNumber || "No PhoneNumber provided";
        link.value = props.Link[0].LinkDesc || "No Link provided";
        linkName.value = props.Link[0].LinkName || "No LinkName provided";

        selectedSkills.value = props.Skill.map(skill => ({
         skill: skill.skill || "Unnamed Skill", 
        }));

      }
    });
    const generatePDF = () => {
      const resumeElement = resumeRef.value;

      html2canvas(resumeElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const doc = new jsPDF();
        doc.addImage(imgData, "PNG", 15, 15, 190, 250);
        doc.save("MyResume.pdf");
      });
    };

    return {
      user,
      name,
      email,
      address,
      phoneNumber,
      link,
      linkName,
      selectedSkills,
      Education: props.Education,
      Experience: props.Experience,
      Award: props.Award,
      Skill: props.Skill.value,
      Projects: props.Project,
      resumeRef,
      generatePDF,
      
      Resume: props.Resume
    };
  },
};
</script>

<template>
  <body>
    <div ref="resumeRef" class="resume-container">
      <header>
        <h1>{{ name }}</h1>
        <p>
          {{ phoneNumber }} | {{ email }} | {{linkName}}: {{ link }}
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        <p>{{ Resume.ProfSummary }}</p>
      </section>

      <!-- Skills -->
      <section>
        <h2>Skills</h2>
        <ul>
          <li v-for="(skill, index) in selectedSkills" :key="index">{{ skill.skill }}</li>
        </ul>
      </section>

      <!-- Experience -->
      <section>
        <h2>Experience</h2>
        <div class="job" v-for="(Experience, index) in Experience" :key="index">
          <h3>{{ Experience.Title }},{{ Experience.Organization}}</h3>
          <p>{{ new Date(Experience.Date[0]).toLocaleDateString() }} - {{ new Date(Experience.Date[Experience.Date.length - 1]).toLocaleDateString() }}</p>
          <p>{{ Experience.JobDescription }}</p>
        </div>
      </section>

      <!-- Education -->
      <section class="education-section">
        <h2>Education</h2>
        <div class="education-item" v-for="(education, index) in Education" :key="index">
          <h3 class="degree">{{ education.degree }}</h3>
          <h4 class="major">{{ education.major }}</h4> <p>GPA: {{ education.GPA }}</p>
            <p class="school-info">
              {{ education.school }}
              <span v-if="education.Date && education.Date.length">
                | {{ formatDate(education.Date[0]) }} - {{ formatDate(education.Date[education.Date.length - 1]) }}
              </span>
            </p>
        </div>
      </section>

      <!-- Projects -->
      <section v-if="Projects && Projects.length">
        <h2>Projects</h2>
        <div v-for="(project, index) in Projects" :key="index">
          <h3>{{ project.ProjectName }}</h3>
          <p>{{ project.ProjectDesc }}</p>
        </div>
      </section>

      <!-- Awards -->
      <section v-if="Award && Award.length">
        <h2>Awards</h2>
        <ul>
          <li v-for="Award in Award" :key="Award.id">{{ Award.AwardName }}</li>
        </ul>
      </section>
    </div>
  </body>
</template>



<style scoped>
  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
    color: #333;
  }

  .resume-container {
    max-width: 900px;
    margin: 30px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  header {
    text-align: center;
    border-bottom: 2px solid #007BFF;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }

  header h1 {
    font-size: 2.5em;
    color: #007BFF;
    margin: 0;
  }

  header p {
    margin: 5px 0;
    font-size: 1em;
    color: #555;
  }

  section {
    margin-bottom: 25px;
  }

  h2 {
    color: #007BFF;
    font-size: 1.5em;
    margin-bottom: 10px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
  }

  /* List Styles */
  ul {
    list-style-type: disc;
    margin: 10px 0 0 20px;
    font-size: 1em;
  }

  ul li {
    margin-bottom: 7px;
  }

  .job, .education {
    margin-bottom: 15px;
  }

  .job h3, .education h3 {
    font-size: 1.2em;
    margin: 0;
    color: #333;
  }

  .job p, .education p {
    font-size: 1em;
    margin: 5px 0;
    color: #666;
  }
  .education-section {
    margin: 20px 0;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .education-item {
    margin-bottom: 20px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .degree {
    font-size: 1.2em;
    font-weight: bold;
  }

  .major {
    font-size: 1em;
    color: #555;
  }

  .school-info {
    font-size: 0.9em;
    color: #777;
  }

</style>
