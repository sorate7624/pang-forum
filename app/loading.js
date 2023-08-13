import LoadingStyles from './../styles/loading.module.scss';

export default function Loading() {
  return (
    <main className={LoadingStyles['wrapper']}>
      <div className={LoadingStyles['inner']}>
        <div className={LoadingStyles['back']}>
          <div className={LoadingStyles['heart']}>
            <div></div>
          </div>
          <h3 className={LoadingStyles['loading']}>Loading...</h3>
        </div>
      </div>
    </main>
  );
}
