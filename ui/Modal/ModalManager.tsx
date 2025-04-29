// @ts-ignore
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '@/redux/store';
import { closeModal } from '@/redux/reducer/ModalSlices';
import ClassModal from './ClassModal';
import NewClassModal from './NewClassModal';
import CreateQuizModal from './CreateQuiz';
import ViewQuiz from './ViewQuiz';
import CategoryModal from './CategoryModal';

export default function ModalManager() {
  const { type, props } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => dispatch(closeModal());
  console.log(type, props);
  useEffect(() => {
    if (!type) return;

    async function loadBootstrap() {
      // @ts-ignore
      const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min');
      const modalElement = document.querySelector('.modal');
      if (modalElement && bootstrap) {
        const bsModal = new bootstrap.Modal(modalElement, {
          backdrop: 'static',
          keyboard: false
        });
        bsModal.show();
      }
    }

    loadBootstrap();
  }, [type, props]);

  if (!type) return null;

  switch (type) {
    case 'CLASS_EDIT':
      return <ClassModal {...props} onClose={handleClose} />;
    case 'NEW_CLASS':
      return <NewClassModal {...props} onClose={handleClose} />;
    case 'CREATE_QUIZ':
      return <CreateQuizModal {...props} onClose={handleClose} />;
    case 'VIEW_QUIZ':
      return <ViewQuiz {...props} onClose={handleClose} />;
    case 'CATEGORY_EDIT':
      return <CategoryModal {...props} onClose={handleClose} />;
    default:
      return null;
  }
}
