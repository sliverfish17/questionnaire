import Link from 'next/link';

import {Button} from '@/components/UI/Button';

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <h1 className="mb-5 text-4xl font-bold">Page Not Found</h1>
    <Button>
      <Link href="/">Go back to homepage</Link>
    </Button>
  </div>
);

export default NotFoundPage;
