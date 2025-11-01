// Data storage
let resumeData = {
  personal: {},
  objective: '',
  profile: '',
  languages: [],
  skills: [],
  workExperience: [],
  education: [],
  additionalSkills: [],
  extracurricular: [],
  certifications: [],
  referees: [],
  otherInfo: {}
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  updatePreview();
});

// Setup event listeners for form inputs
function setupEventListeners() {
  // Personal info
  document.getElementById('fullName').addEventListener('input', updatePreview);
  document.getElementById('phone').addEventListener('input', updatePreview);
  document.getElementById('email').addEventListener('input', updatePreview);
  document.getElementById('address').addEventListener('input', updatePreview);
  document.getElementById('icNumber').addEventListener('input', updatePreview);
  
  // Text areas
  document.getElementById('objective').addEventListener('input', updatePreview);
  document.getElementById('profile').addEventListener('input', updatePreview);
  
  // Languages
  document.getElementById('langEnglish').addEventListener('change', updatePreview);
  document.getElementById('langMelayu').addEventListener('change', updatePreview);
  document.getElementById('langArabic').addEventListener('change', updatePreview);
  
  // Other info
  document.getElementById('availability').addEventListener('input', updatePreview);
  document.getElementById('willingTravel').addEventListener('change', updatePreview);
  document.getElementById('willingRelocate').addEventListener('change', updatePreview);
}

// Update preview
function updatePreview() {
  const preview = document.getElementById('resumePreview');
  
  // Get personal info
  const fullName = document.getElementById('fullName').value || 'NAMA ANDA';
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const icNumber = document.getElementById('icNumber').value;
  const objective = document.getElementById('objective').value;
  const profile = document.getElementById('profile').value;
  
  // Get languages
  const languages = [];
  if (document.getElementById('langEnglish').checked) languages.push('English');
  if (document.getElementById('langMelayu').checked) languages.push('Bahasa Melayu');
  if (document.getElementById('langArabic').checked) languages.push('Arabic');
  resumeData.languages.forEach(lang => languages.push(lang));
  
  // Build HTML
  let html = `
    <div class="resume-header">
      <h1 class="resume-name">${fullName}</h1>
      <div class="resume-contact">
        ${phone ? `<span>📞 ${phone}</span>` : ''}
        ${email ? `<span>✉️ ${email}</span>` : ''}
        ${address ? `<span>📍 ${address}</span>` : ''}
        ${icNumber ? `<span>🆔 ${icNumber}</span>` : ''}
      </div>
    </div>
  `;
  
  // Objective
  if (objective) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Objektif Kerjaya</h2>
        <div class="resume-content">${objective}</div>
      </div>
    `;
  }
  
  // Profile
  if (profile) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Profil Profesional</h2>
        <div class="resume-content">${profile}</div>
      </div>
    `;
  }
  
  // Languages
  if (languages.length > 0) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Bahasa</h2>
        <div class="resume-languages">
          ${languages.map(lang => `<span class="resume-tag">${lang}</span>`).join('')}
        </div>
      </div>
    `;
  }
  
  // Skills
  if (resumeData.skills.length > 0) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Kemahiran</h2>
        <div class="resume-skills-grid">
          ${resumeData.skills.map(skill => `
            <div class="resume-skill">
              <div class="resume-skill-name">
                <span>${skill.name}</span>
                <span>${skill.percent}%</span>
              </div>
              <div class="resume-skill-bar">
                <div class="resume-skill-progress" style="width: ${skill.percent}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Work Experience
  if (resumeData.workExperience.length > 0) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Pengalaman Kerja</h2>
        ${resumeData.workExperience.map(exp => `
          <div class="resume-entry">
            <div class="resume-entry-title">${exp.position}</div>
            <div class="resume-entry-subtitle">${exp.company}</div>
            <div class="resume-entry-date">${exp.startDate} - ${exp.endDate}</div>
            ${exp.description ? `<div class="resume-entry-description">${exp.description}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // Education
  if (resumeData.education.length > 0) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Latar Belakang Pendidikan</h2>
        ${resumeData.education.map(edu => `
          <div class="resume-entry">
            <div class="resume-entry-title">${edu.degree}</div>
            <div class="resume-entry-subtitle">${edu.institution}</div>
            <div class="resume-entry-date">${edu.year}${edu.cgpa ? ` | CGPA: ${edu.cgpa}` : ''}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // Additional Skills
  if (resumeData.additionalSkills.length > 0) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Keahlian Tambahan</h2>
        <div class="resume-skills-grid">
          ${resumeData.additionalSkills.map(skill => `
            <div class="resume-skill">
              <div class="resume-skill-name">
                <span>${skill.name}</span>
                <span>${skill.percent}%</span>
              </div>
              <div class="resume-skill-bar">
                <div class="resume-skill-progress" style="width: ${skill.percent}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Extracurricular
  if (resumeData.extracurricular.length > 0) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Aktiviti Ekstrakurikuler</h2>
        ${resumeData.extracurricular.map(activity => `
          <div class="resume-entry">
            <div class="resume-entry-title">${activity.name}</div>
            ${activity.role ? `<div class="resume-entry-subtitle">${activity.role}</div>` : ''}
            ${activity.year ? `<div class="resume-entry-date">${activity.year}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // Certifications
  if (resumeData.certifications.length > 0) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Sijil &amp; Latihan</h2>
        ${resumeData.certifications.map(cert => `
          <div class="resume-entry">
            <div class="resume-entry-title">${cert.title}</div>
            ${cert.institution ? `<div class="resume-entry-subtitle">${cert.institution}</div>` : ''}
            ${cert.year ? `<div class="resume-entry-date">${cert.year}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // Referees
  if (resumeData.referees.length > 0) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Rujukan</h2>
        <div class="resume-referees-grid">
          ${resumeData.referees.map(ref => `
            <div class="resume-referee">
              <div class="resume-referee-name">${ref.name}</div>
              <div class="resume-referee-info">
                ${ref.position ? `<div>${ref.position}</div>` : ''}
                ${ref.email ? `<div>${ref.email}</div>` : ''}
                ${ref.phone ? `<div>${ref.phone}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Other Info
  const availability = document.getElementById('availability').value;
  const willingTravel = document.getElementById('willingTravel').checked;
  const willingRelocate = document.getElementById('willingRelocate').checked;
  
  if (availability || willingTravel || willingRelocate) {
    html += `
      <div class="resume-section">
        <h2 class="resume-section-title">Maklumat Lain</h2>
        <div class="resume-content">
          ${availability ? `<div><strong>Ketersediaan:</strong> ${availability}</div>` : ''}
          ${willingTravel ? `<div>✓ Bersedia untuk travel</div>` : ''}
          ${willingRelocate ? `<div>✓ Bersedia untuk relocate</div>` : ''}
        </div>
      </div>
    `;
  }
  
  preview.innerHTML = html;
}

// Add other language
function addOtherLanguage() {
  const input = document.getElementById('otherLanguage');
  const value = input.value.trim();
  
  if (value) {
    resumeData.languages.push(value);
    input.value = '';
    
    const list = document.getElementById('otherLanguagesList');
    const item = document.createElement('div');
    item.className = 'language-item';
    item.innerHTML = `
      <span>${value}</span>
      <button type="button" class="btn btn--sm btn--danger" onclick="removeLanguage(${resumeData.languages.length - 1})">Hapus</button>
    `;
    list.appendChild(item);
    
    updatePreview();
  }
}

function removeLanguage(index) {
  resumeData.languages.splice(index, 1);
  const list = document.getElementById('otherLanguagesList');
  list.children[index].remove();
  updatePreview();
}

// Add skill
function addSkill() {
  const nameInput = document.getElementById('skillName');
  const percentInput = document.getElementById('skillPercent');
  
  const name = nameInput.value.trim();
  const percent = parseInt(percentInput.value) || 0;
  
  if (name && percent > 0) {
    const skill = { name, percent };
    resumeData.skills.push(skill);
    
    const list = document.getElementById('skillsList');
    const item = document.createElement('div');
    item.className = 'skill-item';
    item.innerHTML = `
      <span>${name}</span>
      <div class="skill-bar"><div class="skill-progress" style="width: ${percent}%"></div></div>
      <span>${percent}%</span>
      <button type="button" class="btn btn--sm btn--danger" onclick="removeSkill(${resumeData.skills.length - 1})">Hapus</button>
    `;
    list.appendChild(item);
    
    nameInput.value = '';
    percentInput.value = '';
    updatePreview();
  }
}

function removeSkill(index) {
  resumeData.skills.splice(index, 1);
  const list = document.getElementById('skillsList');
  list.children[index].remove();
  updatePreview();
}

// Add work experience
function addWorkExperience() {
  const index = resumeData.workExperience.length;
  resumeData.workExperience.push({
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  const list = document.getElementById('workExperienceList');
  const item = document.createElement('div');
  item.className = 'entry-item';
  item.innerHTML = `
    <div class="entry-header">
      <h4>Pengalaman ${index + 1}</h4>
      <button type="button" class="btn btn--sm btn--danger" onclick="removeWorkExperience(${index})">Hapus</button>
    </div>
    <div class="input-field">
      <label>Jawatan</label>
      <input type="text" onchange="updateWorkExperience(${index}, 'position', this.value)">
    </div>
    <div class="input-field">
      <label>Syarikat</label>
      <input type="text" onchange="updateWorkExperience(${index}, 'company', this.value)">
    </div>
    <div class="input-row">
      <div class="input-field">
        <label>Tarikh Mula</label>
        <input type="text" placeholder="Jan 2020" onchange="updateWorkExperience(${index}, 'startDate', this.value)">
      </div>
      <div class="input-field">
        <label>Tarikh Tamat</label>
        <input type="text" placeholder="Dis 2022" onchange="updateWorkExperience(${index}, 'endDate', this.value)">
      </div>
    </div>
    <div class="input-field">
      <label>Deskripsi</label>
      <textarea rows="3" onchange="updateWorkExperience(${index}, 'description', this.value)"></textarea>
    </div>
  `;
  list.appendChild(item);
}

function updateWorkExperience(index, field, value) {
  resumeData.workExperience[index][field] = value;
  updatePreview();
}

function removeWorkExperience(index) {
  resumeData.workExperience.splice(index, 1);
  const list = document.getElementById('workExperienceList');
  list.children[index].remove();
  updatePreview();
}

// Add education
function addEducation() {
  const index = resumeData.education.length;
  resumeData.education.push({
    degree: '',
    institution: '',
    year: '',
    cgpa: ''
  });
  
  const list = document.getElementById('educationList');
  const item = document.createElement('div');
  item.className = 'entry-item';
  item.innerHTML = `
    <div class="entry-header">
      <h4>Pendidikan ${index + 1}</h4>
      <button type="button" class="btn btn--sm btn--danger" onclick="removeEducation(${index})">Hapus</button>
    </div>
    <div class="input-field">
      <label>Ijazah/Sijil</label>
      <input type="text" placeholder="Contoh: Sarjana Muda Sains Komputer" onchange="updateEducation(${index}, 'degree', this.value)">
    </div>
    <div class="input-field">
      <label>Universiti/Institusi</label>
      <input type="text" onchange="updateEducation(${index}, 'institution', this.value)">
    </div>
    <div class="input-row">
      <div class="input-field">
        <label>Tahun</label>
        <input type="text" placeholder="2018 - 2022" onchange="updateEducation(${index}, 'year', this.value)">
      </div>
      <div class="input-field">
        <label>CGPA/Gred</label>
        <input type="text" placeholder="3.50" onchange="updateEducation(${index}, 'cgpa', this.value)">
      </div>
    </div>
  `;
  list.appendChild(item);
}

function updateEducation(index, field, value) {
  resumeData.education[index][field] = value;
  updatePreview();
}

function removeEducation(index) {
  resumeData.education.splice(index, 1);
  const list = document.getElementById('educationList');
  list.children[index].remove();
  updatePreview();
}

// Add additional skill
function addAdditionalSkill() {
  const nameInput = document.getElementById('additionalSkillName');
  const percentInput = document.getElementById('additionalSkillPercent');
  
  const name = nameInput.value.trim();
  const percent = parseInt(percentInput.value) || 0;
  
  if (name && percent > 0) {
    const skill = { name, percent };
    resumeData.additionalSkills.push(skill);
    
    const list = document.getElementById('additionalSkillsList');
    const item = document.createElement('div');
    item.className = 'skill-item';
    item.innerHTML = `
      <span>${name}</span>
      <div class="skill-bar"><div class="skill-progress" style="width: ${percent}%"></div></div>
      <span>${percent}%</span>
      <button type="button" class="btn btn--sm btn--danger" onclick="removeAdditionalSkill(${resumeData.additionalSkills.length - 1})">Hapus</button>
    `;
    list.appendChild(item);
    
    nameInput.value = '';
    percentInput.value = '';
    updatePreview();
  }
}

function removeAdditionalSkill(index) {
  resumeData.additionalSkills.splice(index, 1);
  const list = document.getElementById('additionalSkillsList');
  list.children[index].remove();
  updatePreview();
}

// Add extracurricular
function addExtracurricular() {
  const index = resumeData.extracurricular.length;
  resumeData.extracurricular.push({
    name: '',
    role: '',
    year: ''
  });
  
  const list = document.getElementById('extracurricularList');
  const item = document.createElement('div');
  item.className = 'entry-item';
  item.innerHTML = `
    <div class="entry-header">
      <h4>Aktiviti ${index + 1}</h4>
      <button type="button" class="btn btn--sm btn--danger" onclick="removeExtracurricular(${index})">Hapus</button>
    </div>
    <div class="input-field">
      <label>Nama Aktiviti</label>
      <input type="text" onchange="updateExtracurricular(${index}, 'name', this.value)">
    </div>
    <div class="input-row">
      <div class="input-field">
        <label>Peranan</label>
        <input type="text" placeholder="Contoh: Ahli, Ketua" onchange="updateExtracurricular(${index}, 'role', this.value)">
      </div>
      <div class="input-field">
        <label>Tahun</label>
        <input type="text" placeholder="2020" onchange="updateExtracurricular(${index}, 'year', this.value)">
      </div>
    </div>
  `;
  list.appendChild(item);
}

function updateExtracurricular(index, field, value) {
  resumeData.extracurricular[index][field] = value;
  updatePreview();
}

function removeExtracurricular(index) {
  resumeData.extracurricular.splice(index, 1);
  const list = document.getElementById('extracurricularList');
  list.children[index].remove();
  updatePreview();
}

// Add certification
function addCertification() {
  const index = resumeData.certifications.length;
  resumeData.certifications.push({
    title: '',
    institution: '',
    year: ''
  });
  
  const list = document.getElementById('certificationList');
  const item = document.createElement('div');
  item.className = 'entry-item';
  item.innerHTML = `
    <div class="entry-header">
      <h4>Sijil ${index + 1}</h4>
      <button type="button" class="btn btn--sm btn--danger" onclick="removeCertification(${index})">Hapus</button>
    </div>
    <div class="input-field">
      <label>Nama Sijil/Latihan</label>
      <input type="text" onchange="updateCertification(${index}, 'title', this.value)">
    </div>
    <div class="input-row">
      <div class="input-field">
        <label>Institusi/Organisasi</label>
        <input type="text" onchange="updateCertification(${index}, 'institution', this.value)">
      </div>
      <div class="input-field">
        <label>Tahun</label>
        <input type="text" placeholder="2023" onchange="updateCertification(${index}, 'year', this.value)">
      </div>
    </div>
  `;
  list.appendChild(item);
}

function updateCertification(index, field, value) {
  resumeData.certifications[index][field] = value;
  updatePreview();
}

function removeCertification(index) {
  resumeData.certifications.splice(index, 1);
  const list = document.getElementById('certificationList');
  list.children[index].remove();
  updatePreview();
}

// Add referee
function addReferee() {
  const index = resumeData.referees.length;
  resumeData.referees.push({
    name: '',
    position: '',
    email: '',
    phone: ''
  });
  
  const list = document.getElementById('refereesList');
  const item = document.createElement('div');
  item.className = 'entry-item';
  item.innerHTML = `
    <div class="entry-header">
      <h4>Rujukan ${index + 1}</h4>
      <button type="button" class="btn btn--sm btn--danger" onclick="removeReferee(${index})">Hapus</button>
    </div>
    <div class="input-field">
      <label>Nama</label>
      <input type="text" onchange="updateReferee(${index}, 'name', this.value)">
    </div>
    <div class="input-field">
      <label>Jawatan</label>
      <input type="text" onchange="updateReferee(${index}, 'position', this.value)">
    </div>
    <div class="input-row">
      <div class="input-field">
        <label>Email</label>
        <input type="email" onchange="updateReferee(${index}, 'email', this.value)">
      </div>
      <div class="input-field">
        <label>Telefon</label>
        <input type="tel" onchange="updateReferee(${index}, 'phone', this.value)">
      </div>
    </div>
  `;
  list.appendChild(item);
}

function updateReferee(index, field, value) {
  resumeData.referees[index][field] = value;
  updatePreview();
}

function removeReferee(index) {
  resumeData.referees.splice(index, 1);
  const list = document.getElementById('refereesList');
  list.children[index].remove();
  updatePreview();
}

// Reset form
function resetForm() {
  if (confirm('Adakah anda pasti mahu reset semua maklumat?')) {
    document.getElementById('resumeForm').reset();
    resumeData = {
      personal: {},
      objective: '',
      profile: '',
      languages: [],
      skills: [],
      workExperience: [],
      education: [],
      additionalSkills: [],
      extracurricular: [],
      certifications: [],
      referees: [],
      otherInfo: {}
    };
    
    // Clear dynamic lists
    document.getElementById('otherLanguagesList').innerHTML = '';
    document.getElementById('skillsList').innerHTML = '';
    document.getElementById('workExperienceList').innerHTML = '';
    document.getElementById('educationList').innerHTML = '';
    document.getElementById('additionalSkillsList').innerHTML = '';
    document.getElementById('extracurricularList').innerHTML = '';
    document.getElementById('certificationList').innerHTML = '';
    document.getElementById('refereesList').innerHTML = '';
    
    updatePreview();
  }
}

// Export to PDF
function exportToPDF() {
  const element = document.getElementById('resumePreview');
  const opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(element).save();
}

// Export to DOCX
function exportToDocx() {
  const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } = docx;
  
  const fullName = document.getElementById('fullName').value || 'NAMA ANDA';
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const icNumber = document.getElementById('icNumber').value;
  const objective = document.getElementById('objective').value;
  const profile = document.getElementById('profile').value;
  
  const sections = [];
  
  // Header
  sections.push(
    new Paragraph({
      text: fullName,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
    })
  );
  
  if (phone || email || address || icNumber) {
    const contact = [phone, email, address, icNumber].filter(x => x).join(' | ');
    sections.push(
      new Paragraph({
        text: contact,
        alignment: AlignmentType.CENTER,
      })
    );
  }
  
  sections.push(new Paragraph({ text: '' }));
  
  // Objective
  if (objective) {
    sections.push(
      new Paragraph({
        text: 'OBJEKTIF KERJAYA',
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({ text: objective })
    );
    sections.push(new Paragraph({ text: '' }));
  }
  
  // Profile
  if (profile) {
    sections.push(
      new Paragraph({
        text: 'PROFIL PROFESIONAL',
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({ text: profile })
    );
    sections.push(new Paragraph({ text: '' }));
  }
  
  // Languages
  const languages = [];
  if (document.getElementById('langEnglish').checked) languages.push('English');
  if (document.getElementById('langMelayu').checked) languages.push('Bahasa Melayu');
  if (document.getElementById('langArabic').checked) languages.push('Arabic');
  resumeData.languages.forEach(lang => languages.push(lang));
  
  if (languages.length > 0) {
    sections.push(
      new Paragraph({
        text: 'BAHASA',
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({ text: languages.join(', ') })
    );
    sections.push(new Paragraph({ text: '' }));
  }
  
  // Skills
  if (resumeData.skills.length > 0) {
    sections.push(
      new Paragraph({
        text: 'KEMAHIRAN',
        heading: HeadingLevel.HEADING_2,
      })
    );
    resumeData.skills.forEach(skill => {
      sections.push(new Paragraph({ text: `${skill.name} - ${skill.percent}%` }));
    });
    sections.push(new Paragraph({ text: '' }));
  }
  
  // Work Experience
  if (resumeData.workExperience.length > 0) {
    sections.push(
      new Paragraph({
        text: 'PENGALAMAN KERJA',
        heading: HeadingLevel.HEADING_2,
      })
    );
    resumeData.workExperience.forEach(exp => {
      sections.push(
        new Paragraph({
          text: exp.position,
          bold: true,
        }),
        new Paragraph({ text: exp.company, italics: true }),
        new Paragraph({ text: `${exp.startDate} - ${exp.endDate}` })
      );
      if (exp.description) {
        sections.push(new Paragraph({ text: exp.description }));
      }
      sections.push(new Paragraph({ text: '' }));
    });
  }
  
  // Education
  if (resumeData.education.length > 0) {
    sections.push(
      new Paragraph({
        text: 'LATAR BELAKANG PENDIDIKAN',
        heading: HeadingLevel.HEADING_2,
      })
    );
    resumeData.education.forEach(edu => {
      sections.push(
        new Paragraph({ text: edu.degree, bold: true }),
        new Paragraph({ text: edu.institution, italics: true }),
        new Paragraph({ text: `${edu.year}${edu.cgpa ? ' | CGPA: ' + edu.cgpa : ''}` })
      );
      sections.push(new Paragraph({ text: '' }));
    });
  }
  
  // Additional Skills
  if (resumeData.additionalSkills.length > 0) {
    sections.push(
      new Paragraph({
        text: 'KEAHLIAN TAMBAHAN',
        heading: HeadingLevel.HEADING_2,
      })
    );
    resumeData.additionalSkills.forEach(skill => {
      sections.push(new Paragraph({ text: `${skill.name} - ${skill.percent}%` }));
    });
    sections.push(new Paragraph({ text: '' }));
  }
  
  // Extracurricular
  if (resumeData.extracurricular.length > 0) {
    sections.push(
      new Paragraph({
        text: 'AKTIVITI EKSTRAKURIKULER',
        heading: HeadingLevel.HEADING_2,
      })
    );
    resumeData.extracurricular.forEach(activity => {
      sections.push(
        new Paragraph({ text: activity.name, bold: true })
      );
      if (activity.role) sections.push(new Paragraph({ text: activity.role }));
      if (activity.year) sections.push(new Paragraph({ text: activity.year }));
      sections.push(new Paragraph({ text: '' }));
    });
  }
  
  // Certifications
  if (resumeData.certifications.length > 0) {
    sections.push(
      new Paragraph({
        text: 'SIJIL & LATIHAN',
        heading: HeadingLevel.HEADING_2,
      })
    );
    resumeData.certifications.forEach(cert => {
      sections.push(
        new Paragraph({ text: cert.title, bold: true })
      );
      if (cert.institution) sections.push(new Paragraph({ text: cert.institution }));
      if (cert.year) sections.push(new Paragraph({ text: cert.year }));
      sections.push(new Paragraph({ text: '' }));
    });
  }
  
  // Referees
  if (resumeData.referees.length > 0) {
    sections.push(
      new Paragraph({
        text: 'RUJUKAN',
        heading: HeadingLevel.HEADING_2,
      })
    );
    resumeData.referees.forEach(ref => {
      sections.push(
        new Paragraph({ text: ref.name, bold: true })
      );
      if (ref.position) sections.push(new Paragraph({ text: ref.position }));
      if (ref.email) sections.push(new Paragraph({ text: ref.email }));
      if (ref.phone) sections.push(new Paragraph({ text: ref.phone }));
      sections.push(new Paragraph({ text: '' }));
    });
  }
  
  // Other Info
  const availability = document.getElementById('availability').value;
  const willingTravel = document.getElementById('willingTravel').checked;
  const willingRelocate = document.getElementById('willingRelocate').checked;
  
  if (availability || willingTravel || willingRelocate) {
    sections.push(
      new Paragraph({
        text: 'MAKLUMAT LAIN',
        heading: HeadingLevel.HEADING_2,
      })
    );
    if (availability) sections.push(new Paragraph({ text: `Ketersediaan: ${availability}` }));
    if (willingTravel) sections.push(new Paragraph({ text: '✓ Bersedia untuk travel' }));
    if (willingRelocate) sections.push(new Paragraph({ text: '✓ Bersedia untuk relocate' }));
  }
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: sections,
    }],
  });
  
  Packer.toBlob(doc).then(blob => {
    saveAs(blob, 'resume.docx');
  });
}

// Print resume
function printResume() {
  window.print();
}