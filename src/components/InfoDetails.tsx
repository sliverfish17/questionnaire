import {Button} from '@/components/UI/Button';
import {useHandleInfo} from '@/hooks/useHandleInfo';

interface InfoDetailsProps {
  content: string;
  referenceId?: number;
  questionId: number;
}

export const InfoDetails = ({
  content,
  referenceId,
  questionId,
}: InfoDetailsProps) => {
  const handleNext = useHandleInfo(questionId, referenceId);

  return (
    <div className="mx-auto flex max-w-[330px] flex-col items-center justify-center">
      <div className="space-y-4 text-center text-info">
        <p className="mb-10 font-sans">{content}</p>
        <Button
          onClick={handleNext}
          className="mt-6 rounded-md bg-white px-6 py-2 text-gray-800 shadow-md hover:bg-gray-200"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
