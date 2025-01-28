import categorySaga from '@modules/categories/api/saga';
import homeSage from '@modules/home/api/sage';
import {categoriesData} from '@utils/db';
import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(homeSage), fork(categorySaga)]);
}
