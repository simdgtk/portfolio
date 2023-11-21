document.addEventListener('DOMContentLoaded', function() {
  const blockedSection = document.querySelector('.blocked-section');
  const blockedContent = document.querySelector('.blocked-content');

  blockedSection.addEventListener('scroll', function() {
    // Vérifiez si la section bloquée a été scrollée jusqu'en bas
    if (blockedSection.scrollHeight - blockedSection.scrollTop === blockedSection.clientHeight) {
      // Bloquer le défilement de la section bloquée
      blockedContent.style.position = 'static';
    } else {
      // Autoriser le défilement de la section bloquée
      blockedContent.style.position = 'fixed';
    }
  });
});