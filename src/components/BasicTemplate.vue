<script>
import { ref, onMounted } from "vue";
import Utils from "/src/config/utils";

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
    Skill: { type: Array, required: true }
  },
  setup(props) {
    const user = ref(null);
    const name = ref("");
    const email = ref("");
    const address = ref("");

    onMounted(() => {
      const storedUser = Utils.getStore("user");
      if (storedUser) {
        user.value = storedUser;
        name.value = `${storedUser.fName} ${storedUser.lName}`;
        email.value = storedUser.email;
        address.value = props.ContactInfo.Address || "No address provided"; 
      }
    });

    return {
      user,
      name,
      email,
      address,
    };
  },
};
</script>


<template>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Basic Template</title>
    </head>
    <body>
      <div class="container">
        <header>
          <h1 >{{ name }}</h1>
          <p>
            {{address}} | (555) 555-5555 |
            <a>{{ email }}</a> |
            <a href="#">LinkedIn/Website URL</a>
          </p>
        </header>

        <section id="summary">
          <h2>Professional Summary</h2>
          <p></p>
        </section>

        <!-- Education Section -->
        <section id="education">
          <h2>Education</h2>
          <p>
            <strong>Oklahoma Christian University, Oklahoma City, OK</strong><br />
          </p>
        </section>

        <section id="experience">
          <h2>Professional Experience</h2>
          <div class="job">
            <h3>Employer, Your Title</h3>
            <p>City, State | Date (Start Month, Year - End Month, Year)</p>
            <ul>
              <li><!-- Bullet point 1 --></li>
              <li><!-- Bullet point 2 --></li>
              <li><!-- Bullet point 3 --></li>
            </ul>
          </div>
          <!-- Duplicate the .job block for each additional role -->
        </section>

        <!-- Skills & Leadership Section -->
        <section id="skills">
          <h2>Skills | Leadership Skills | Activities</h2>
          <ul>
            <li><!-- Skill or activity --></li>
            <li><!-- Skill or activity --></li>
          </ul>
        </section>
      </div>
    </body>
  </html>
</template>

<style>
/* General Reset */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f9;
}

/* Container */
.container {
  max-width: 800px;
  margin: 20px auto;
  background: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Header */
header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

header p {
  font-size: 14px;
  color: #555;
}

header a {
  color: #0077cc;
  text-decoration: none;
}

/* Section Titles */
section h2 {
  font-size: 18px;
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  color: #222;
}

/* Professional Experience */
.job {
  margin-bottom: 15px;
}

.job h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.job p {
  font-size: 14px;
  color: #555;
}

.job ul {
  margin: 10px 0 0;
  padding-left: 20px;
}

.job ul li {
  margin-bottom: 5px;
}

/* Skills */
#skills ul {
  margin: 0;
  padding-left: 20px;
}

#skills ul li {
  margin-bottom: 5px;
}
</style>
