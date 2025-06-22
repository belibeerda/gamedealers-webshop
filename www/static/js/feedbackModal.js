document.querySelector('.feedback-container-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const modal = document.getElementById('modal-overlay');
    modal.style.display = 'flex';
    
    this.reset();
  });
  
  document.getElementById('modal-ok-button').addEventListener('click', function() {
    document.getElementById('modal-overlay').style.display = 'none';
  });
  
  document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });