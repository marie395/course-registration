Author: Tsamo Rooswell


import { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gestion des inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Bonus: changer le titre — useEffect correctement fermé ✅
  useEffect(() => {
    if (formData.name) {
      document.title = formData.name + " - Registration";
    }
  }, [formData]);

  // Validation — dans le corps du composant, pas dans useEffect ✅
  const errors = {};

  if (!formData.name) {
    errors.name = "Name is required";
  }
  if (!formData.email.includes("@")) {
    errors.email = "Invalid email";
  }
  if (!formData.agreeToTerms) {
    errors.agreeToTerms = "You must accept terms";
  }

  // Formulaire valide
  const isValid = Object.keys(errors).length === 0;

  // Soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Registration successful !");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Course Registration</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <br />

        <select name="course" value={formData.course} onChange={handleChange}>
          <option value="">Select Course</option>
          <option value="React">React</option>
          <option value="Laravel">Laravel</option>
          <option value="Node">Node</option>
        </select>
        <br />

        <label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          Accept Terms
        </label>
        {errors.agreeToTerms && (
          <p style={{ color: "red" }}>{errors.agreeToTerms}</p>
        )}
        <br />

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>

      <h3>
        {formData.name &&
          `${formData.name} is registering for ${formData.course || "a course"}`}
      </h3>
    </div>
  );
}

export default App;
/*
1- pourquoi utiliser un state object ?
on utilise un state object pour regrouper toutes les données du formulaire dans une seule variable.cela facilite la gestion,
la mise a jour et la validation des champs.

2- difference entreinput controlé et non controlé ?
un input controlé est lié qu state React (value + onchange).

3- pourquoi la validation en temps réel ?
elle ameliore l'experience utilisateur car l'utilisateur voit immediatement 
les erreurs et peut les corriger sans attendre la soumission.
*/


// import LiveSearch from "./Composants/LiveSearch";
// import CharCounter from "./Composants/CharCounter";
// import LoginForm from "./Composants/LoginForm";
// import ToggleForm from "./Composants/ToggleForm";
// export default function App() {
//   return (
//     <div>
//       <LiveSearch />
//       <CharCounter />
//       <LoginForm />
//       <ToggleForm />
//     </div>
//   );
// }
