import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleParams, setArticleParams] = useState(defaultArticleState);

	const handleChangeParams = (params: ArticleStateType) => {
		setArticleParams(params);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChangeParams={handleChangeParams} />
			<Article />
		</div>
	);
};
