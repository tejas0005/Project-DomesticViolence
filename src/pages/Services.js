import React from 'react';
import './CSS file/Services.css';
import resourceService from './Home/images/resourceService.jpg';
import incidentReport from './Home/images/incidentReport.webp';
import seekHelp from './Home/images/seekHelp.jpg';
import safehouse from './Home/images/safehouse.webp';
import legal from './Home/images/legal.webp';
import healthService from './Home/images/healthService.jpg'
import group from './Home/images/group.jpg';
import donation from './Home/images/donation.jpg';

const Services = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p>
        Our platform is dedicated to supporting individuals who have been affected by domestic violence. We offer a range of services designed to empower users, provide crucial information, and connect them with resources to ensure their safety and well-being. Here are the core services we offer:
      </p>

      {/* Resource Center */}
      <div className="service">
        <h2>Resource Center</h2>
        <p>
          Our Resource Center provides users with access to a wide variety of legal, health, and community resources. Whether you're looking for advice, emergency contacts, or local organizations that offer support, our resource center is a trusted starting point for those seeking help.
        </p>
        <img src={resourceService} alt="Resource Center" />
      </div>

      {/* Incident Reporting */}
      <div className="service">
        <h2>Incident Reporting</h2>
        <p>
          Our platform allows individuals to report incidents of domestic violence confidentially and seek immediate help. With just a few clicks, users can alert authorities or trusted organizations to get the help they need quickly and securely.
        </p>
        <img src={incidentReport} alt="Incident Reporting" />
      </div>

      {/* Seek Help */}
      <div className="service">
        <h2>Seek Help</h2>
        <p>
          For individuals seeking urgent assistance, our platform connects users with support services such as counselors, therapists, and legal advisors. Immediate help can be requested, ensuring that users are never alone in times of crisis.
        </p>
        <img src={seekHelp} alt="Seek Help" />
      </div>

      {/* Seek Shelter */}
      <div className="service">
        <h2>Seek Shelter</h2>
        <p>
          We provide access to safe shelters for individuals facing domestic violence. Our platform helps users locate nearby shelters that offer protection, food, and emotional support, allowing victims to escape dangerous situations and find a safe place to stay.
        </p>
        <img src={safehouse} alt="Seek Shelter" />
      </div>

      {/* Legal Resources */}
      <div className="service">
        <h2>Legal Resources</h2>
        <p>
          Access to legal resources is essential for individuals affected by domestic violence. Our platform connects users with legal advisors who can provide counsel on their rights, legal actions, and protection orders.
        </p>
        <img src={legal} alt="Legal Resources" />
      </div>

      {/* Health & Well-being */}
      <div className="service">
        <h2>Health & Well-being</h2>
        <p>
          In addition to legal and emotional support, we emphasize the importance of physical and mental health. Our platform connects individuals with healthcare providers who specialize in trauma care, mental health services, and other essential health support.
        </p>
        <img src={healthService} alt="Health & Well-being" />
        
      </div>

      {/* Community Support */}
      <div className="service">
        <h2>Community Support</h2>
        <p>
          Building a supportive community is vital for healing. We offer a space where individuals affected by domestic violence can connect with others who have had similar experiences. Our community support options include peer groups, therapy sessions, and advocacy programs.
        </p>
        <img src={group} alt="Community Support" />
      </div>

      {/* Charity & Donations */}
      <div className="service">
        <h2>Charity & Donations</h2>
        <p>
          We rely on the support of generous individuals and organizations to continue providing our services. Through our platform, users can donate to charity organizations that support victims of domestic violence and help fund initiatives to prevent future abuse.
        </p>
        <img src={donation} alt="Charity & Donations" />
        
      </div>
    </div>
  );
};

export default Services;
