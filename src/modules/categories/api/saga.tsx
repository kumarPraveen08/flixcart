import {fetchCategoriesData} from './api';
import {GET_CATEGORIES} from './contants';
import {setData, setError, setLoading} from './slice';
import {call, put, takeEvery} from 'redux-saga/effects';

function* fetchCategoriesApiData(): any {
  try {
    yield put(setLoading());
    const value = yield call(fetchCategoriesData);
    yield put(setData(value));
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

function* categorySaga() {
  yield takeEvery(GET_CATEGORIES, fetchCategoriesApiData);
}

export default categorySaga;
