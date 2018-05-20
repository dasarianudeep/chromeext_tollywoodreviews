const service =  {
    protocol: 'https://',
    hostname: 'agile-ocean-20166.herokuapp.com',
    pathname: '/reviews'
};

$.ajax({ url: `${service.protocol}${service.hostname}${service.pathname}`}).then(res => {
    $('.main_wrapper').hide();

    const getAllReviews = reviews => {
        return reviews.map(review => {
            return `
            <div class="review_wrapper">
            <div class="review_content-website">
                <img src=${review.sitelogo} />
            </div>
            <div class="review_content-verdict">
                <div>${review.verdict}</div>
            </div>
            <div class="review_content-rating">
                <div class="rating">${review.rating}</div>
                <div><a href=${review.siteUrl} target="_blank">Read Review</a></div>
            </div>
            </div>
            `
        })
    };

    res.movies.telugu.forEach(movie => {
        $('.moviereviews_wrapper').append(`
        <li class="movie">
        <div class="movie_name">
            <img src=${movie.movieAvatar} width="150" height="150"/>
        </div>
        <div class="movie_releasedata">Rel. Date: ${movie.releaseDate.replace(/[th,\,]/g, '')}</div>
        </li>
        <div class="review_content">
          ${getAllReviews(movie.reviews)}
        </div>
    `);
    });


    $('.moviereviews_wrapper').show();

    $('.movie').click(function() {
        $(this).next().slideToggle();
        $('.review_content').not( $(this).next()).slideUp();

    });
});
/*
 <div class="review_content-website">
                <img src=${movie.reviews[0].sitelogo} />
                <div>${movie.reviews[0].siteName}</div>
            </div>
            <div class="review_content-verdict">
                <div>${movie.reviews[0].verdict}</div>
            </div>
            <div class="review_content-rating">
                <div>${movie.reviews[0].rating}</div>
                <div><a href=${movie.reviews[0].siteUrl} target="_blank">Click for more</a></div>
            </div>
 */
