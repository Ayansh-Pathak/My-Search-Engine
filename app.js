class UIManager {
            constructor() {
                this.container = document.getElementById('container');
                this.headerEl = document.querySelector('header');
                this.contactHeader = document.getElementById('banner');
            }

            configureContactMessage(contact) {
                // If no contact info or method is 1 (None), don't show any contact message
                if (!contact || !contact.method || contact.method === 1) {
                    return;
                }

                const contactEl = contact.location === 'bottom' ? 
                    this.ensureContactFooter() : this.contactHeader;
                if (!contactEl) return;

                // Create contact link
                const link = document.createElement('a');
                link.href = '/_c';
                link.textContent = contact.banner_text;
                link.style.textDecoration = 'none';

                // Apply styles based on contact style
                if (contact.style === 'aggressive') {
                    contactEl.style.background = '#ff6b6b';
                    link.style.color = '#ffffff';
                    link.style.fontWeight = 'bold';
                } else {
                    contactEl.style.background = '#646464';
                    link.style.color = '#eeeeee';
                }

                const p = document.createElement('p');
                p.appendChild(link);
                contactEl.innerHTML = '';
                contactEl.appendChild(p);
                contactEl.style.opacity = '1';
            }

            ensureContactFooter() {
                let contactFooter = document.getElementById('contact-footer');
                if (!contactFooter) {
                    contactFooter = document.createElement('div');
                    contactFooter.id = 'contact-footer';
                    contactFooter.style.cssText = 'position: fixed; bottom: 0; left: 0; width: 100%; opacity: 0; transition: opacity 0.3s ease; padding: 10px 0; text-align: center;';
                    document.body.appendChild(contactFooter);
                }
                return contactFooter;
            }
        }

        var contactInfo = null;

        window.onload = function() {
            var uiManager = new UIManager();
            if (contactInfo) {
                uiManager.configureContactMessage(contactInfo);
            }
            
            // Auto-focus search input on page load
            document.getElementById('search-input').focus();
        };