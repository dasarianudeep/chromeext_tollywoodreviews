const service =  {
    protocol: 'http://',
    hostname: 's3.amazonaws.com/telugumoviereviews',
    pathname: '/reviews.json'
};

$.ajax({ url: `${service.protocol}${service.hostname}${service.pathname}`}).then(res => {
    $('.main_wrapper').hide();

    const getAllReviews = reviews => {
        if (reviews.length === 0) {
            return `
                <div class="noreviews">
                   <p>No Reviews as of now! Coming Soon <span class="dot-loader"></span></p>
                </div>
            `;
        }
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

    JSON.parse(res).movies.telugu.forEach(movie => {
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
