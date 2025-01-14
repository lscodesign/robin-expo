// ModalContext.tsx
import CustomModal from '@app/components/CustomModal';
import React, {createContext, useState, useContext, ReactNode} from 'react';

type ModalContextType = {
	showModal: (content: ReactNode) => void;
	hideModal: () => void;
	isFullScreen?: (show: boolean) => void;
	isShowCloseButton?: (show: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{children: ReactNode}> = ({children}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);
	const [showCloseButton, setShowCloseButton] = useState(false);
	const [modalContent, setModalContent] = useState<ReactNode>(null);

	const showModal = (content: ReactNode) => {
		setModalContent(content);
		setIsVisible(true);
	};

	const hideModal = () => {
		setIsVisible(false);
		setModalContent(null);
	};

	const isFullScreen = (show: boolean) => {
		setFullScreen(show);
	};

	const isShowCloseButton = (show: boolean) => {
		setShowCloseButton(true);
	};

	return (
		<ModalContext.Provider value={{showModal, hideModal, isFullScreen, isShowCloseButton}}>
			{children}
			<CustomModal
				visible={isVisible}
				onClose={hideModal}
				content={modalContent}
				fullScreen={fullScreen}
				showCloseButton={showCloseButton}
			/>
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
};
