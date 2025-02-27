import React from 'react';
import '../Css/About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-mission">
        <h1>Our Mission</h1>
        <p>At PetDestined, our mission is to provide a safe and nurturing environment for animals in need, while promoting responsible pet ownership and advocating for animal welfare.</p>
      </div>

      <div className="our-team">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <img src="team1.jpg" alt="Team Member 1" />
          <p>Name: John Doe, Role: Shelter Manager</p>
        </div>
        <div className="team-member">
          <img src="team2.jpg" alt="Team Member 2" />
          <p>Name: Jane Smith, Role: Adoption Coordinator</p>
        </div>
      </div>

      <div className="success-stories">
        <h2>Success Stories</h2>
        <p>Read inspiring stories of pets who have found their forever homes through our shelter.</p>
        <button>View Stories</button>
      </div>

      <div className="contact-us">
        <h2>Get in Touch</h2>
        <p>Contact us to learn more about volunteering, donating, or adopting a pet.</p>
        <button>Contact Us</button>
      </div>
    </div>
  );
}

export default About;
