import JobModel from "../models/JobModel.js";

// ✅ Récupérer toutes les offres d'emploi
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.findAll();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Publier une offre d'emploi
export const createJob = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newJob = await JobModel.create({
      title,
      description,
      postedBy: req.user.id, // ID de l'utilisateur connecté
    });

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Modifier une offre
export const updateJob = async (req, res) => {
  try {
    const job = await JobModel.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this job" });
    }

    await job.update(req.body);
    res.json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Supprimer une offre
export const deleteJob = async (req, res) => {
  try {
    const job = await JobModel.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this job" });
    }

    await job.destroy();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Candidater à une offre
export const applyForJob = async (req, res) => {
  try {
    const job = await JobModel.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
