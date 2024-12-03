<template>
    <div class="admin-view">
        <h2>Admin Review Page</h2>

        <textarea v-model="adminComment" placeholder="Add your comments here..."></textarea>

        <!-- Action Buttons -->
        <div class="buttons">
            <button @click="saveComment">Save</button>
            <button @click="cancelComment">Cancel</button>
        </div>
        
        <!-- Resume Display Section -->
        <div class="resume-display">
            <h3>Resume Preview</h3>
            <div class="resume-content">
                <p v-if="resumeContent">{{ resumeContent }}</p>
                <p v-else>No resume selected or available.</p>
            </div>
        </div>
    </div>
</template>

<script>
import ResumeService from "../services/resumeServices";

export default {
    data() {
        return {
            adminComment: "",
            resumeContent: "", 
        };
    },
    methods: {
        async saveComment() {
            try {
                const user = Utils.getStore("user");
                const userId = user ? user.userId : null;

                if (!userId) {
                    console.error("User ID not found.");
                    return;
                }

                await ResumeService.updateResume({
                    resumeId: this.resumeId,
                    adminComment: this.adminComment,
                });

                alert("Comment saved successfully.");
            } catch (error) {
                console.error("Failed to save comment:", error);
            }
        },
        cancelComment() {
            this.adminComment = "";
        },
        async fetchResume(resumeId) {
            try {
               
                const response = await ResumeService.getResume(resumeId);
                this.resumeContent = response.data.content; 
            } catch (error) {
                console.error("Failed to fetch resume:", error);
                this.resumeContent = "Error loading resume.";
            }
        },
    },
    mounted() {
        
        if (this.$route.query.resumeId) {
            this.fetchResume(this.$route.query.resumeId);
        }
    },
};
</script>

<style scoped>
.admin-view {
    padding: 20px;
    text-align: center;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.resume-display {
    margin-bottom: 20px;
    text-align: center;
}

.resume-display h3 {
    margin-bottom: 10px;
    color: #333;
}

.resume-content {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;
    background-color: #f9f9f9;
    width: 75%;
    height: 450px;
    overflow-y: scroll;
    margin: 0 auto;
    text-align: left;
}

textarea {
    border: 1px solid black;
    width: 50%;
    height: 200px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 4px;
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
}

button {
    background-color: maroon;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: darkred;
}
</style>
