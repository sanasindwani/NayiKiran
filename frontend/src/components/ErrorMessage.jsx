import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ error, onRetry, title }) => {
  const { t } = useTranslation();

  const getErrorMessage = (error) => {
    if (error?.response?.status === 500) {
      return t('errors.serverError');
    } else if (error?.response?.status === 404) {
      return t('errors.pageNotFound');
    } else if (error?.response?.status === 401) {
      return t('errors.unauthorized');
    } else if (error?.response?.status === 403) {
      return t('errors.forbidden');
    } else if (error?.code === 'NETWORK_ERROR') {
      return t('errors.networkError');
    } else {
      return t('errors.somethingWentWrong');
    }
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {title || t('errors.somethingWentWrong')}
          </h3>
          <p className="text-sm text-red-700 mt-1">
            {getErrorMessage(error)}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              {t('common.retry') || 'Retry'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
