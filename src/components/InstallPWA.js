import React, { useEffect, useState } from 'react';

function InstallPWA() {
	const [deferredPrompt, setDeferredPrompt] = useState(null);
	const [showInstall, setShowInstall] = useState(false);

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setShowInstall(true);
		});
	}, []);

	const handleInstall = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the install prompt');
				}
				setDeferredPrompt(null);
				setShowInstall(false);
			});
		}
	};

	if (!showInstall) return null;

	return (
		<button
			className="btn btn-success btn-sm position-fixed bottom-0 end-0 m-3"
			onClick={handleInstall}
			style={{ zIndex: 1000 }}
		>
			📲 Установить приложение
		</button>
	);
}

export default InstallPWA;