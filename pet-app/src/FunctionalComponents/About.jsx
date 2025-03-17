import React from 'react';
import { FaPaw, FaHeart, FaHandHoldingHeart, FaClipboardList } from 'react-icons/fa';
import '../Css/About.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About PetDestined</h1>
        <p className="about-tagline">Connecting Loving Homes with Pets in Need</p>
      </div>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <div className="mission-content">
          <div className="mission-image"></div>
          <p>
            At PetDestined, we believe every pet deserves a loving home. Our mission is to simplify 
            the pet adoption process, making it easier for potential pet parents to find their perfect 
            companion while giving shelter animals a second chance at happiness.
          </p>
        </div>
      </section>

      <section className="about-how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <FaPaw />
            </div>
            <h3>Browse Available Pets</h3>
            <p>Search through our database of pets from shelters and rescues in your area. Filter by species, breed, age, and more to find your perfect match.</p>
          </div>

          <div className="step">
            <div className="step-icon">
              <FaHeart />
            </div>
            <h3>Submit an Adoption Request</h3>
            <p>When you find a pet you connect with, submit an adoption request with your information and why you think you'd be a good match.</p>
          </div>

          <div className="step">
            <div className="step-icon">
              <FaClipboardList />
            </div>
            <h3>Application Review</h3>
            <p>Our shelter partners will review your application to ensure their pet is going to a suitable home that can meet their specific needs.</p>
          </div>

          <div className="step">
            <div className="step-icon">
              <FaHandHoldingHeart />
            </div>
            <h3>Welcome Home</h3>
            <p>Once approved, we'll help coordinate the adoption process so you can welcome your new family member home!</p>
          </div>
        </div>
      </section>

      <section className="about-benefits">
        <h2>Why Choose PetDestined</h2>
        <div className="benefits-grid">
          <div className="benefit">
            <h3>Simplified Process</h3>
            <p>Our streamlined adoption process makes finding and adopting a pet easier than ever.</p>
          </div>
          <div className="benefit">
            <h3>Carefully Vetted Pets</h3>
            <p>All pets on our platform come from reputable shelters and rescues with health and behavior information.</p>
          </div>
          <div className="benefit">
            <h3>Post-Adoption Support</h3>
            <p>We provide resources and advice to help you and your new pet adjust to life together.</p>
          </div>
          <div className="benefit">
            <h3>Community Focused</h3>
            <p>By adopting through us, you're supporting local animal welfare organizations in your community.</p>
          </div>
        </div>
      </section>

      <section className="about-guidelines">
        <h2>Adoption Guidelines</h2>
        <div className="guidelines-content">
          <p>To ensure successful adoptions and the wellbeing of our animals, we have the following guidelines:</p>
          <ul>
            <li>Adopters must be at least 18 years of age</li>
            <li>Proof of residence may be required</li>
            <li>All household members should be in agreement about adopting a pet</li>
            <li>If you rent, you may need to provide proof of pet-friendly housing</li>
            <li>Some pets may require specific living conditions (yard space, no other pets, etc.)</li>
            <li>Be prepared for the financial responsibility of pet ownership</li>
          </ul>
        </div>
      </section>

      <section className="about-team">
        <h2>Our Team</h2>
        <p>PetDestined founded by a group of animal lovers with backgrounds in animal welfare, technology, and customer service. We're dedicated to improving animal adoption rates and reducing the number of pets in shelters.</p>
        <p>Our platform partners with shelters and rescue organizations throughout the country to showcase their animals to potential adopters.</p>
      </section>

      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>Have questions about our platform or the adoption process?</p>
        <div className="contact-info">
          <p><strong>Email:</strong> support@petdestined.com</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
          
        </div>
      </section>
    </div>
  );
};

export default AboutPage;